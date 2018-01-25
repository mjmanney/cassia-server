Cassia Server
===============
Author
---------------
Michael Manney
michael.manney@koamtac.com
KOAMTAC

About
---------------
The KDC280Ci Bluetooth Low Energy (BLE) Barcode Scanner allows for fast
data transmission over the OPEN, HID, or SPP profiles.  When connected to
the Cassia E1000 Bluetooth router the operating radius of the scanner
increases a tremendous 70 meters.

Typically there are multiple Cassia router's in a given environment.
To help manage the routers and the devices that connect to them, Cassia
offers an IoT Access Controller (AC) software, alongside a set of
manageable REST APIs.

This server provides the business application to communicate and control
the behavior of the router including:

  -  Scanning, connecting, disconnected from BLE devices
  -  Filtering search results
  -  Passing necessary data

This document explains the flow and logic of the server program.

SERVER JS
---------------
Adds the express, router, and body-parser module.

  -  express    :  creates the app
  -  router     :  determines the app endpoints and their behavior
  -  body-parser:  parses the body of the request to be returned in the
                   body of the response

The port number determines which port for the app to listen to requests.
The MAC address is the address of the Cassia router.  In this case we are
only using one router.

Finally, the app is created with the following as middleware functions:

  1.  The router is mounted to the root directory of the app.
      This means all routes defines will inherit '/' as their parent.
  2.  The app will parse the body of all requests to be included in the
      body of the response in JSON format.
  3.  TODO URL ENCODED
  4.  The server starts and listens for requests on the specified port.

ROUTER JS
---------------
Adds the express, router, body-parser, and authenticate module.

  -  authenticate :  retrieves and authentication token from the AC
                     sever

The router adds a middleware function, which logs every request.
The router servers index.html when navigated to the root directory.
When navigating to /api/authenticate on a GET request, the user
validation form is sent to the client.  However on a POST request
the form is submitted and the authenticate module is passed the
user parameters.
TODO user validation.

AUTHENTICATE JS
---------------
This module executes when the user enters their credentials on
authenticate.html.  These credentials are sent to this server.

Those credentials are stored then sent to the AC server for
authentication in a new request.  To ensure the two requests
are made in the correct order, the request to the AC server is
wrapped in a promise.  The result of the promise is passed to the
response of this server.  If successful, the token is saved in a
variable on the server as well as stored in a cookie on the client.

The cookie was set so the token can be included in the SSE call
when scanning for BLE devices in scan.js.

SCAN.JS
---------------
This is client side JavaScript that creates a new EventSource
object.  The AC server constantly sends scanning results of
nearby BLE devices until the user terminates the connection or
leaves the page.

The devices are first filtered in the query parameters to
reduce traffic.  Then the remaining traffic is filtered by
name to only display KDC devices.  When a KDC devices is
found it is added to the list.  By clicking on the KDC its
BT MAC address is added to the form and ready to be submitted
for connection.

CONNECT.JS
---------------
This module establishes a connection with the KDC device.
The URL requires the node (device MAC address), router MAC
address, and the type of connection in the body (form).

The request to make a connection is wrapped in a promise
which will display an error if the connection fails.  On
a succesful connection the KDC device will beep and display
"Bluetooth Connected" on the LCD screen.
