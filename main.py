import requests


import fileinput
import re
import datetime

# Get the current UTC time
utc_now = datetime.datetime.utcnow()

# Define the UTC offset for ICT (UTC+7)
ict_offset = datetime.timedelta(hours=7)

# Calculate the current time in ICT
ict_now = utc_now + ict_offset

# Format the result as a string
fmt = "%Y-%m-%d %H:%M:%S"
ict_now_str = ict_now.strftime(fmt)


def main():
    # Define the file to read from
    filename = "README.md"

    # Define the search pattern and replacement string
    start = r"<!--START_SECTION:weather-->"

    # Use fileinput to replace the word in the file

    url = "https://api.open-meteo.com/v1/forecast"

    params = {
        "latitude": 14.541536,
        "longitude": 101.244110,
        "current_weather": True,
        "timezone": "Asia/Bangkok",
        "precipitation_unit": "mm",
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        # The request was successful
        data = response.json()
        # Do something with the data
        replacement = f"""<!--START_SECTION:weather-->\n
<p align="center">
<table>
  <tbody>
  <tr>
  </tr>
  <tr>
    <th colspan="4" align="center">
        <p align="center">เมืองปากช่อง</p>
        <p align="center">Pak Chong City</p>
    </th>
  </tr>
  <tr>
    <th align="center">
         <br>
      <img src="https://cdn.discordapp.com/attachments/581018943041306641/1091183945216954378/thermometer.svg" alt="Temperature Icon" width="60px" style="max-width: 100%;"><br>
      {data['current_weather']['temperature']}°C<br>   
    </th>
    <th align="center">
         <br>
      <img src="https://cdn.discordapp.com/attachments/581018943041306641/1091186488772923453/overcast.svg" alt="Wind Icon" width="60px" style="max-width: 100%;">
      <br>
      {data["current_weather"]["windspeed"]}m/s
      <br>
    </th>
  </tr>
</tbody>
</table>
เขตเวลา {data['timezone']}
<br>
อัพเดทล่าสุด {ict_now_str}
</p">"""
        with open(filename, mode="r", encoding="utf-8") as file:
            file_contents = file.readlines()

        # Replace the pattern with the replacement string in the file contents
        del file_contents[15:47]
        string_new = "".join(file_contents)
        with open(filename, mode="w", encoding="utf-8") as file:
            file.write(string_new)

        with open(filename, mode="r", encoding="utf-8") as file:
            file_contents = file.read()
        updated_contents = re.sub(start, replacement, file_contents)

        with open(filename, mode="w", encoding="utf-8") as file:
            file.write(updated_contents)


if __name__ == "__main__":
    main()
