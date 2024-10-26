import json


def search_by_country_state(country_name, state_name=None):
    data = load_country_state_data()

    for country in data:
        if country['name'].lower() == country_name.lower():
            if state_name:
                for state in country.get('states', []):
                    if state['name'].lower() == state_name.lower():
                        return {
                            'country': country['name'],
                            'state': state['name'],
                            'region': country['region'],
                            'subregion': country['subregion']
                        }
            return {
                'country': country['name'],
                'region': country['region'],
                'subregion': country['subregion']
            }
    return None


def load_country_state_data():
    with open('../countries_states_assets/countries.json') as f:
        data = json.load(f)
    return data
