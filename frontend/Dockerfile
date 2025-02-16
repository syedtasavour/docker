FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy the HTML file to the Nginx server
COPY index.html .

# Expose port 80 to the outside world
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]