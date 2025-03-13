import http.server
import socketserver
import os

# Configure the server
PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

# Customize headers to properly serve 3D models and JavaScript files
class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()
    
    def guess_type(self, path):
        # Add proper MIME types for 3D models and JS files if needed
        if path.endswith('.gltf'):
            return 'model/gltf+json'
        if path.endswith('.glb'):
            return 'model/gltf-binary'
        return super().guess_type(path)

# Display server information
print(f"Starting server at http://localhost:{PORT}")
print(f"Serving files from: {os.path.abspath(os.curdir)}")
print("Press Ctrl+C to stop the server")

# Start the server
with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.") 