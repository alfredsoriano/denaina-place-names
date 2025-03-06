## CSCE A470 Capstone Project
### Denaina Place Names Web App  
**Contributors: Alfred Soriano, Chris Yang, and Jiwon Bae**  
**Clients: Dr. Maria Williams and Dr. Jessica Ross**  
**Technical Mentor: Dr. Pradeeban Kathiravelu**

### Project Details
This interactive map and web application is aimed to provide users with historical and cultural information about Dena’ina places within Anchorage and the greater southcentral area, for the heritage and culture revitalization in Alaska. This project will focus specifically on the Upper Cook Inlet Dena’ina region, with the target dialect of the Upper Cook Inlet Dena’ina Dene.

The clients for this project are local cultural heritage initiative Professors from the University of Alaska Anchorage (UAA) named Dr. Maria Williams and Dr. Jessica Ross. Working alongside our clients will be technical mentor Dr. Pradeeban Kathiravelu.

The goal of this project focuses on providing an accessible and user-friendly experience to learn about the Dena’ina place names and their historical significance. As such, the project aims to be informative and educational, rather than merely providing functionalities. The scope of this project includes designing and developing a web application, curating content, and integrating interactive features that display historical information based on historical or cultural locations.

---

### Installation and Usage  
Make sure Node.js and Node Package Manager (npm) is installed. If installing Node.js, npm should be installed alongside it.  
You can check the Node.js version installed with `node -v` and the npm version with `npm -v`.  

**1. Open a terminal, and clone the GitHub repository.**  
This can be done by using the following command 
```
git clone https://github.com/alfredsoriano/denaina-place-names.git
```

**2. Next, type the following lines of code into the terminal.**  

```
cd denaina-place-names
```
```
npm install
```
```
npm run dev
```

This will install Vite into the current directory "denaina-place-names", and will available to be run on your localhost server as a webpage.  
Note that you only need to run `npm install` once upon cloning the repository. If you are accessing the repository again for future use, you can just use the `npm run dev` command to start viewing the webpage.  

To run your website for other devices, you need to use 
```
npm run dev -- --host
```
instead. Then, type the link with the IP address and port number to your device. 
For example: `http://172.16.11.228:5173/` 

**3. Type o, then press enter to open and view the web application.**  
This will automatically open a new window on a web browser using the localhost web address.
Make sure to save any overwritten files, and refresh the website to view changes.  
