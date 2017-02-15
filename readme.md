# fetch-curis-applications

Gets applications from the CURIS site and prints them in machine-readable format ready to be imported into a spreadsheet or MyriadHub.

## Installation

```bash
git clone https://github.com/gkovacs/fetch-curis-applications.git
cd fetch-curis-applications
npm install -g yarn livescript
yarn
```

## Usage

First go to the curis site, look at the Network tab under the Developer Tools, and look for the one which starts with `get_applications_of_my_projects`. Save it as a JSON file with the name `applications_summary.json`.

Then go to the Cookies tab, and save them as a YAML file `cookies.yaml` which should have the following structure:

```yaml
_ga: something
amplitude_idstanford.edu: something
webauth_at: something
```

Now run the following command, it will produce the `applications.json` file:

```bash
lsc fetch_applications.ls
```

Now run the following command to filter and print applicant names and emails in a format that can be imported into a spreadsheet:

```bash
lsc filter_applications.ls
```

## Author

[Geza Kovacs](https://github.com/gkovacs)

