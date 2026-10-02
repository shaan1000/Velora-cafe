Velora Café

A responsive, multi-page website for Velora Café, an independent café for slow mornings, bold coffee and good moments. Built with plain HTML, CSS and JavaScript, with no frameworks and no build step.

Features
Interactive menu with 24 items across 6 categories (Coffee, Tea, Breakfast, Food, Dessert, Cold Drinks)
Category filters and live search on the menu page
Shopping cart in a slide-out drawer with quantity controls, a running total in INR (₹), and a saved cart that persists between visits using localStorage
Featured items section on the home page
Responsive layout with a mobile burger menu
Reservation and contact forms with client-side validation (email, 10-digit Indian mobile number, future dates only)
Newsletter signup in the footer
Gallery lightbox, review slider and a weekly offer countdown
Scroll animations, animated stat counters and a back-to-top button
Accessibility touches: ARIA labels, keyboard support (Esc closes the cart and menu), visible focus styles and prefers-reduced-motion support
Pages
Page	Description
index.html	Home: hero, featured items, offers, gallery, reviews
menu.html	Full menu with filters, search and add to cart
about.html	Our story
contact.html	Reservation and contact form
Project structure
velora-cafe/
├── index.html
├── menu.html
├── about.html
├── contact.html
├── style.css
└── script.js
Getting started
Clone the repository:
bash
   git clone https://github.com/your-username/velora-cafe.git
   cd velora-cafe
Open index.html in your browser, or serve the folder locally:
bash
   # Python
   python -m http.server 8000

   # or Node
   npx serve
Visit http://localhost:8000.
Customising
Editing the menu

Menu items are defined in the M array at the top of script.js. Each item follows this format:

javascript
[category, id, name, description, price, featured]

Example:

javascript
['Coffee', 'c1', 'Velora Signature Latte', 'Espresso, house caramel, cardamom, silky oat or whole milk', 240, 1]
id must be unique, because it is used by the cart.
Set featured to 1 to show the item on the home page.
Prices are plain numbers in rupees and are formatted with toLocaleString('en-IN').
Changing category images

Each category image is set in the menuImages object in script.js. Replace the URLs with your own photos.

Colours and fonts

Theme colours and fonts are CSS variables at the top of style.css:

css
:root {
  --cream: #f6efe4;
  --esp: #2b1d16;
  --gold: #b8924a;
  --serif: 'Cormorant Garamond', Georgia, serif;
  --sans: 'Inter', system-ui, sans-serif;
}

The fonts are Cormorant Garamond and Inter. Load them from Google Fonts in each page's <head>, or the site falls back to Georgia and the system sans-serif font.

Required page elements

script.js is shared by every page and looks for specific IDs. If one is missing, that feature is skipped without an error.

Element ID	Used for
#featured	Featured items on the home page
#menuGrid, #tabs, #search	Menu grid, category tabs and search box on the menu page
#countdown	Offer countdown
#dots and .slide	Review slider
#lb, #lbImg, #lbX	Gallery lightbox
form[data-form]	Reservation and contact forms
#date	Reservation date picker (blocks past dates)

Load the script with defer, or place it just before </body>, because it inserts the header and footer into the page.

html
<script src="script.js" defer></script>
Tech stack
HTML5
CSS3 (custom properties, grid, flexbox)
Vanilla JavaScript (ES2021+)
Browser support

Works in current versions of Chrome, Edge, Firefox and Safari.

Credits
Photos from Unsplash
Fonts from Google Fonts
