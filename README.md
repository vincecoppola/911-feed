# 911-feed
A real time feed for 911 calls in south King County, WA built upon Meteor.

## Dependencies
This Meteor project has multiple dependencies, both internally and externally. 

All data pulled from the MongoDB database is first captured using SDR hardware/[software](http://github.com/cgommel/sdrsharp) as well as [PDW](http://github.com/Discriminator/PDW) for the decoding of each page. Pages are then passed as an argument to a Python script (which can be found in another one of my repos) in order to parse them and extract pertinent call data.

A live version of the site can be seen [here](http://trimed.co).
