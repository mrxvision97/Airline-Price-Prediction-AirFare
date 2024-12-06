from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
from datetime import datetime

# Load the model pipeline
model_pipeline = joblib.load("model_pipeline.pkl")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

bins = [0, 6, 12, 18, 24]
labels = ['Night', 'Morning', 'Afternoon', 'Evening']

# Define route distances
route_distances = {
    'Delhi to Mumbai': 1140, 'Delhi to Bangalore': 1740, 'Delhi to Hyderabad': 1270,
    'Delhi to Kolkata': 1310, 'Delhi to Chennai': 1770, 'Delhi to Ahmedabad': 775,
    'Mumbai to Delhi': 1140, 'Mumbai to Bangalore': 840, 'Mumbai to Hyderabad': 620,
    'Mumbai to Kolkata': 1720, 'Mumbai to Chennai': 1290, 'Mumbai to Ahmedabad': 440,
    'Bangalore to Delhi': 1740, 'Bangalore to Mumbai': 840, 'Bangalore to Hyderabad': 500,
    'Bangalore to Kolkata': 1740, 'Bangalore to Chennai': 290, 'Bangalore to Ahmedabad': 1200,
    'Hyderabad to Delhi': 1270, 'Hyderabad to Mumbai': 620, 'Hyderabad to Bangalore': 500,
    'Hyderabad to Kolkata': 1450, 'Hyderabad to Chennai': 525, 'Hyderabad to Ahmedabad': 940,
    'Kolkata to Delhi': 1310, 'Kolkata to Mumbai': 1720, 'Kolkata to Bangalore': 1740,
    'Kolkata to Hyderabad': 1450, 'Kolkata to Chennai': 1670, 'Kolkata to Ahmedabad': 1650,
    'Chennai to Delhi': 1770, 'Chennai to Mumbai': 1290, 'Chennai to Bangalore': 290,
    'Chennai to Hyderabad': 525, 'Chennai to Kolkata': 1670, 'Chennai to Ahmedabad': 1850,
    'Ahmedabad to Delhi': 775, 'Ahmedabad to Mumbai': 440, 'Ahmedabad to Bangalore': 1200,
    'Ahmedabad to Hyderabad': 940, 'Ahmedabad to Kolkata': 1650, 'Ahmedabad to Chennai': 1850
}


def get_travel_season(month):
    if month in [12, 1, 2]:
        return 'Winter'
    elif month in [3, 4, 5]:
        return 'Spring'
    elif month in [6, 7, 8]:
        return 'Summer'
    elif month in [9, 10, 11]:
        return 'Autumn'
    else:
        return 'Unknown'


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        # Extract and process input data
        booking_date = datetime.strptime(data["booking_date"], "%Y-%m-%d")
        journey_date = datetime.strptime(data["journey_date"], "%Y-%m-%d")
        lead_time = (journey_date - booking_date).days

        # Derived features
        day_of_week_journey = journey_date.strftime("%A")
        month_journey = journey_date.month
        weekend = 1 if journey_date.weekday() >= 5 else 0
        departure_hour = int(data["departure_hour"])
        arrival_hour = int(data["arrival_hour"])
        travel_season = get_travel_season(month_journey)

        # Class features
        travel_class = data["travel_class"].lower()
        is_economy_class = 1 if travel_class == "economy" else 0
        is_business_class = 1 if travel_class == "business" else 0
        is_first_class = 1 if travel_class == "first" else 0

        # Time of day categories
        departure_time_of_day = pd.cut([departure_hour], bins=bins, labels=labels, right=False)[0]
        arrival_time_of_day = pd.cut([arrival_hour], bins=bins, labels=labels, right=False)[0]

        # Distance lookup
        route = f"{data['source']} to {data['destination']}"
        distance = route_distances.get(route, 0)

        # Create input DataFrame
        input_data = pd.DataFrame([{
            "Total Stops": int(data["stops"]),
            "Airline": data["airline"],
            "Source": data["source"],
            "Destination": data["destination"],
            "DayOfWeek_Journey": day_of_week_journey,
            "Month_Journey": month_journey,
            "Weekend": weekend,
            "BookingLeadTime": lead_time,
            "DepartureHour": departure_hour,
            "ArrivalHour": arrival_hour,
            "Departure_TimeOfDay": departure_time_of_day,
            "Arrival_TimeOfDay": arrival_time_of_day,
            "IsEconomyClass": is_economy_class,
            "IsBusinessClass": is_business_class,
            "IsFirstClass": is_first_class,
            "TravelSeason": travel_season,
            "Distance": distance
        }])

        # Predict fare
        predicted_fare = model_pipeline.predict(input_data)[0]
        return jsonify({"fare": round(predicted_fare, 2)})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Export the app for Vercel
app = app