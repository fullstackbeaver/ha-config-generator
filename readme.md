# unleash Home Assistant with JS - configuration generator

TypeScript project for generating configuration files from excel exports for projet ["unleash Home Assistant with JS"](https://github.com/fullstackbeaver/unleasHAwithJS) for javascript enthousiasts.
This project utilizes TypeScript to generate configuration files from Excel exports, enabling the creation of intricate interactions with [Home Assistant](https://www.home-assistant.io/).

Home Assistant is a renowned open-source platform for home automation, providing a centralized hub for managing various smart devices.

## Installation
To set up this project, follow these steps:

Clone the Repository:
```Bash
git clone https://github.com/fullstackbeaver/ha-config-generator.git
```

Navigate to the Project Directory:
```Bash
cd ha-config-generator
```

Install Dependencies:
```Bash
npm install
```

## Usage

* Copy [this excel file](https://docs.google.com/spreadsheets/d/1t5vkZxZll8bGY_m6Kfqf74bE2VN_hlhJYQPkAOcKLPk/edit?gid=0#gid=0)

* on your copy, update each sheet following your needs. Be aware that sheet name should be the same as Home Assistant entity ( "Alarm control panel", "Binary sensor", "Button", "Camera", "Cover", "Device tracker", "Device trigger", "Event", "Fan", "Humidifier", "Image", "HVAC", "Lawn mower", "Light", "Lock", "Number", "Scene", "Select", "Sensor", "Siren", "Switch", "Update", "Tag scanner", "Text", "Vacuum", "Valve", "Water heater" ).

* export each sheet as CSV. Check exported file name : it shloud be "xxx - yyy.csv" where xxx is the original excel file name and yyy is your entity name. It's important to keep this format for automatic import.

* move exported files into CSV folder.

* add or update files in templates directory. Each template should be named as desired entity (double check with the list below)

* make a build
```Bash
npm run build
```

* launch generator with this command :
```Bash
node ha-config-generator.js
```

On each template modification or update on CSV file, you need to make once again a build an run generator.

## Use Generated Configuration Files:
Integrate the generated configuration files into your Home Assistant setup.
Enjoy the enhanced interactions and automation capabilities.
SonarCloud Results
To view the SonarCloud analysis results, navigate to the SonarCloud dashboard for your project. The dashboard provides insights into code quality, potential issues, and overall project health.

## Contribution
Contributions to this project are highly appreciated. Feel free to fork the repository, propose improvements, and submit pull requests.

## Quality
### sonarcloud evaluation
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ha-config-generator&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ha-config-generator)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ha-config-generator&metric=bugs)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ha-config-generator)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ha-config-generator&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ha-config-generator)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ha-config-generator&metric=coverage)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ha-config-generator)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ha-config-generator&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ha-config-generator)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ha-config-generator&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ha-config-generator)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ha-config-generator&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ha-config-generator)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ha-config-generator&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ha-config-generator)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ha-config-generator&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ha-config-generator)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=fullstackbeaver_ha-config-generator&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=fullstackbeaver_ha-config-generator)

### unit tests
Unit tests are not implemented yet and will come in comming commits.

Happy Home Automation!