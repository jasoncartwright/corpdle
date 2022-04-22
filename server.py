import http.server as httpserver
import socketserver

class CORSRequestHandler (SimpleHTTPRequestHandler):
    def end_headers (self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)

def main(port=None):
	if port is None:
		port = 8000
	handler = httpserver.SimpleHTTPRequestHandler
	try:
		httpd = socketserver.TCPServer(("", port), handler)
		print("serving at port", port)
		httpd.serve_forever()
	except OSError:
		print("Given PORT:{} is unavailable.Try running with diffrent PORT Number!".format(port))

if __name__ == '__main__':
	main()