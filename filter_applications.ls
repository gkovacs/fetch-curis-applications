require! {
  jsonfile
}

applications = jsonfile.readFileSync 'applications.json'

filtered = []
for x in applications
  if x.title.indexOf('HabitLab') == -1
    continue
  if x.year == 'Freshman'
    continue
  if parseFloat(x.gpa) < 3.6 # and parseFloat(x.gpa) != 0
    continue
  filtered.push x

for x in filtered
  {email, applicant_name} = x
  first_name = applicant_name.split(' ')[0]
  last_name = applicant_name.split(' ')[*-1]
  console.log "#{first_name}\t#{last_name}\t#{email}"
