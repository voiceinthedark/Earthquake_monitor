"""EarthQuake Monitor v. 1
Usage: 
    eqm START END
    eqm START END -m <mag>

Arguments:
    START  A date in the format yyyy-mm-dd
    END  A date in the format yyyy-mm-dd

Options:
    -h --help   Show this help screen
    -m --minmag=<mag>  filter by a minimum magnitude
    
"""

import json, datetime
from datetime import datetime
import requests
import docopt




def do_request(start_time='2020-04-14', end_time='2020-04-15', magnitude=0):
    init_query = "https://earthquake.usgs.gov/fdsnws/event/1/query"
    params = {'format': 'geojson', 'starttime': start_time, 'endtime': end_time}
    r = requests.get(init_query, params=params)
    if r.status_code == 200:
        response = json.loads(r.content)
        array_earthquakes = response.get('features')
        for eq_obj in array_earthquakes:
            if eq_obj['properties']['mag'] > magnitude:
                t = eq_obj['properties']['time']                
                eq_date = datetime.fromtimestamp(t/1000).strftime('%Y/%m/%d %H:%M')
                print(f"{eq_obj['properties']['mag']: >5} magnitude {eq_obj['properties']['place']: >50} \ton {eq_date: >25}")


if __name__ == "__main__":
    args = docopt.docopt(__doc__, version='1.0')
    # print(args)
    if args['--minmag']:
        do_request(start_time=args['START'], end_time=args['END'], magnitude=int(args['--minmag']))
    else:
        do_request(start_time=args['START'],
                   end_time=args['END'])