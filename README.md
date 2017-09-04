# [Sunset Hackathon 2017](http://sunsethackathon.pt/)

# 2017 - Odisseia na Costa Nova

Sponsored by Bosch.

> **Goal**: To redesign the booth and HMI of an autonomous vehicle.

We implemented a distributed system where voice recognition, natural language processing, text to speech, speech to text, voice localization, and other technologies interacted to create a smart vehicle environment where voice commands can be used to control the car. We won 1st place in the Sunset Hackathon 2017 competition.

[![Demo](https://img.youtube.com/vi/kL9SA_CbQf8/0.jpg)](https://www.youtube.com/watch?v=kL9SA_CbQf8)
([https://www.youtube.com/watch?v=kL9SA_CbQf8](https://www.youtube.com/watch?v=kL9SA_CbQf8))

----

We used a central unit (VCU) as the main coordinator of the environment. Using [MQTT](http://mqtt.org/) as a message broker, the VCU coordinated voice related components with the sensor (SCU) and display (VDU) units. We relied on Microsoft Cognitive Services for our voice components, using [Microsoft LUIS](https://azure.microsoft.com/en-us/services/cognitive-services/language-understanding-intelligent-service/) to detect intent, [Microsoft Speaker Recognition API](https://azure.microsoft.com/en-us/services/cognitive-services/speaker-recognition/) to identify the user, [Amazon Polly](https://aws.amazon.com/pt/polly/) for text-to-speech, and [Bing Speech API](https://azure.microsoft.com/en-us/services/cognitive-services/speech/) for speech-to-text. We also used a [Microsoft Kinect](https://developer.microsoft.com/en-us/windows/kinect) for voice localization, [Arduino](https://www.arduino.cc/) and [Raspberry Pi](https://www.raspberrypi.org/) micro-controllers, [Hover](http://www.hoverlabs.co/products/hover/) for motion sensing, [Flask](http://flask.pocoo.org/) as a WebEngine, and [Jabra](http://www.jabra.com/business/speakerphones/jabra-speak-series/jabra-speak-410) as a central speaker/microphone. 

![Architecture](https://user-images.githubusercontent.com/9117323/30034755-60c6ded4-919b-11e7-87ed-107e38ab7e5e.png)

We also built a custom dashboard with Hover, Kinect, Jabra and a vertical screen integrated, where a RaspberryPi ran the VDU. We built a custom model car with Arduino where servo-motors controlled the windows, trunk and hydraulics of the vehicle.

![VDU and SCU](https://user-images.githubusercontent.com/9117323/30034752-5e6fb214-919b-11e7-8766-bdc110c13a51.jpg)




