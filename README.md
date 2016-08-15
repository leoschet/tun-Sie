# tun-Sie
Tun Sie die Zertifikate!

TunSie is a webApp to automate the replication of certificates, ending with the manual work necessary to **create the same certificate for many people.**

With a base SVG model of your certificate, you are able to replace the tags on your text for valid information

# Run, replicate, close!
Clone the repository using HTTPS
```
git clone https://github.com/leoschet/tun-Sie.git
```
or using SSH
```
git clone git@github.com:leoschet/tun-Sie.git
```

Navigate to tun-Sie folder and execute the following commands to install dependencies and run TunSie:
```
npm install
node app.js
```

TunSie will be running at [localhost:3700][local]. Now you are able to set the base model of your certificate, the list of participants and generate the certificates with passed informations.

# Setting up your certificate's SVG model
TODO: Write this section

# Contributing
You are free to contribute with the project, fork it and start coding!

## Next steps
- Tag replacing
- Automatic download
- Validate Tag-replacing fields
- User-friendly interface (80%)
- Dinamically SVG set
- Dinamically Tag-replacing fields (set the tags and the information in runtime)
- PDF download option

# License
[MIT license][mit]

[mit]: http://opensource.org/licenses/mit-license.php
[local]: http://localhost:3700
