# Chart-lego

chart lego is a visual large-screen drag-and-drop system.

## Technology selection

front end: vue3 + ts + ANTV
back end: Egg + mysql + redis + alioss

The volume of the project itself is not large, just as a way of personal learning. The framework of node commonly used by individuals is used here. redis is to consider the large number of charts that need to be read in real time, and ali is used to store pictures and other static resources, so as to prepare for the later configuration of c, d and n. Each chart itself is rendered in real time (only the js code (string) of the chart is stored, which has been verified here, and the general file size does not exceed the kb level). There is no need to store the static file of the chart on the server, so there is no need for non-relational databases such as mongodb.
