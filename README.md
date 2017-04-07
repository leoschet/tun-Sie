# tun-Sie
Tun Sie die Zertifikate!

TunSie is a webApp for automate the replication of certificates, ending with the manual work necessary to **create the same certificate to a lot of people.**

With a base SVG model of your certificate, you're able to replace the tags in the certificate's text with valid information!

# Run, replicate, close!
Clone the repository using HTTPS
```
git clone https://github.com/leoschet/tun-Sie.git
```
or using SSH
```
git clone git@github.com:leoschet/tun-Sie.git
```

Navigate to tun-Sie folder and execute the following commands in order to install dependencies and run TunSie:
```
npm install
node app.js
```

TunSie will be running on [localhost:3700][local]. Now you are able to set the base model of your certificate, the list of participants and generate the certificates with passed informations.

# Setting up your certificate's SVG model
TODO: Write this section

# Contributing
You are free for contribute with the project, fork it and start coding!

## Next steps
- Tag replacing (OK)
- Dinamically get the position to adjust the text
- Validate the use of tspan (only auto-wrap the text if tspan exists)
- Validate Tag-replacing fields (check if its blank)
- Validate SVG load (check if its loaded)
- User-friendly interface
- Dinamically SVG set
- Dinamically Tag-replacing fields (set the tags and the information in runtime)
- PDF download option

# License
[MIT license][mit]

[mit]: http://opensource.org/licenses/mit-license.php
[local]: http://localhost:3700
