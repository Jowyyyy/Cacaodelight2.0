import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import translations from './Translations';
import { db } from './components/login/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ImageFetcher from "./components/ImageFetcher";
import { addToCart } from '../src/components/cesta/CartFunctions';
import './css/all.min.css';
import './css/bootstrap.min.css';
import './css/tooplate-style.css';
import styles from './Product.module.css';

function CollapsibleCard({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card">
      <div className="card-header" onClick={() => setIsOpen(!isOpen)}>
        <h2 className="mb-0">
          {title}
          <button className="btn btn-link float-right">
            {isOpen ? '-' : '+'}
          </button>
        </h2>
      </div>
      {isOpen && (
        <div className="card-body">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}


function homePage() {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [language, setLanguage] = useState('es');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const homePage = () => {
    return (
      <div>
        <h1>Bienvenido a la Página de Cacao</h1>
        <ImageFetcher /> 
      </div>
    );
  };

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'productos'));
      const productList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const switchToSpanish = () => setLanguage('es');
  const switchToEnglish = () => setLanguage('en');
  const switchToCatalan = () => setLanguage('ca');

  const {
    title,
    logIn,
    introduction,
    products: productsText,
    description,
    contact,
    fbPage,
    sustainability,sostenibilidad,p1,vision,mision,p2,p3,p4,p5,contactAnimation,infocontact 
  } = translations[language];
  const [featuresRef, featuresInView] = useInView({ threshold: 0.5 });
  const [companyRef, companyInView] = useInView({ threshold: 0.5 });
  const [activitiesRef, activitiesInView] = useInView({ threshold: 0.5 });
  const [showScrollButton, setShowScrollButton] = useState(false);
  const slideAnimation = useSpring({
    from: { transform: 'translateX(-100%)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
    config: { duration: 1000 },
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };
  const [activeTab, setActiveTab] = useState('vision'); 

  const handleTabClick = (tabId) => {
    setActiveTab(tabId); 
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const bannerAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });


  const homeAnimation = useSpring({ opacity: 1, from: { opacity: 0 } });

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "src/img/agricultorhome1.jpg",
    "src/img/fotostockvainacacao.jpg",
    "src/img/vainacacaooberta.jpg",
    "src/img/dona1.jpg"
  ];

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <div style={homeAnimation}>
        <div className="container" id="home">
          <div className="col-12 text-center">
            <div className="tm-page-header">
              <img src="src/img/logo.webp" alt="logo" className="logo" />
              <h1 className="d-inline-block text-uppercase">{title}</h1>
            </div>
          </div>
        </div>
        <div className="botontrad">
          <button className="btn-31" onClick={switchToSpanish}>Español</button>
          <button className="btn-31" onClick={switchToEnglish}>Inglés</button>
          <button className="btn-31" onClick={switchToCatalan}>Catalán</button>
        </div>
      </div>

       {/* navbar */}
       <div className="tm-nav-section">
  <div className="container">
    <div className="row">
      <div className="col-13">
        <nav className="navbar navbar-expand-md navbar-light navbar-custom">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse" data-target="#tmMainNav"
            aria-controls="tmMainNav"
            aria-expanded="false" aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="tmMainNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" onClick={() => scrollToSection('home')}>
                  {logIn} <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => scrollToSection('product')}>
                  {introduction}
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" onClick={() => scrollToSection('company')}>
                  {sustainability}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => scrollToSection('contact')}>
                  {contact}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link external"
                  href="https://www.facebook.com/templatemo"
                >
                  {fbPage}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</div>
<div className="carousel-container">
        <div className="slider-frame" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          <ul>
            {images.map((image, index) => (
              <li key={index}>
                <img src={image} alt={`Imagen ${index + 1}`} />
              </li>
            ))}
          </ul>
        </div>

        {/* productos */}
      </div>
      <div className="container" id='product'>
      <div className={styles.productHeader}>
        <h2 className={styles.sectionTitle}>Nuestros productos de cacao</h2>
        <p className={styles.sectionDescription}>
          Descubre nuestros productos hechos con cacao de la mejor calidad, ideales para tus recetas o cuidados personales.
        </p>
      </div>
      <div className="row product-list" style={{ position: 'relative' }}>
        {loading ? (
          <p>Cargando productos...</p>
        ) : products.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.tmActivityImgContainer}>
                <img src={product.image} alt={product.name} className={styles.tmActivityImg} />
              </div>
              <div className={styles.tmActivityBlockText}>
                <h3 className={styles.tmTextBlue}>{product.name}</h3>
                <p>{product.description}</p>
                <p>Precio: ${product.price}</p>
                <button className={styles.addToCartBtn} onClick={() => addToCart(product)}>
                  Añadir al carrito
                </button>
              </div>
            </div>
          ))
        )}

        <button className={styles.cartButton} onClick={() => navigate('/cart')}> Ir a la cesta
        </button>
        </div>
      <div className="container tm-features-section" id="features">

          <section ref={companyRef} className="container tm-company-section" id="company" style={companyInView ? slideAnimation : {}}>
          <div className="row">
            <div className="col-xl-9 col-lg-8 col-md-12 tm-company-left">
              <div className="tm-company-about">
                <div className="tm-company-img-container">
                  <img src="src/img/img-05.jpg" alt="Image" />
                </div>
                <div className="tm-company-about-text">
                  <header>
                    <h2 className="tm-company-about-header">{sostenibilidad}</h2>
                  </header>
                  <p>
                    {p1}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-4 col-md-12 tm-company-right ml-lg-auto mr-lg-0">
              <div className="tm-company-right-inner">
                <ul className="nav nav-tabs" id="tmCompanyTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className={`nav-link tm-nav-link-border-right ${activeTab === 'vision' ? 'active' : ''}`}
                      onClick={() => handleTabClick('vision')}
                      role="tab"
                      aria-controls="vision"
                      aria-selected={activeTab === 'vision' ? 'true' : 'false'}
                    >
                      {vision}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link tm-no-border-right ${activeTab === 'mission' ? 'active' : ''}`}
                      onClick={() => handleTabClick('mission')}
                      role="tab"
                      aria-controls="mission"
                      aria-selected={activeTab === 'mission' ? 'true' : 'false'}
                    >
                      {mision}
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="tmTabContent">
                  <div
                    className={`tab-pane fade ${activeTab === 'vision' ? 'show active' : ''}`}
                    id="vision"
                    role="tabpanel"
                    aria-labelledby="vision-tab"
                  >
                    {p2}

                    {p3}
                  </div>
                  <div
                    className={`tab-pane fade ${activeTab === 'mission' ? 'show active' : ''}`}
                    id="mission"
                    role="tabpanel"
                    aria-labelledby="mission-tab"
                  >
                    {p4}
                    {p5}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>


      </div>

      
      {/* Contact */}
      <div style={contactAnimation}>
  <section className="container tm-contact-section" id="contact">
    <div className="row">
      <div className="col-xl-5 col-lg-6 col-md-12 tm-contact-left">
        <div className="tm-contact-form-container ml-auto mr-0">
          <header>
            <h2 className="tm-contact-header">Contacte</h2>
          </header>
          <form action="/enviar-correo" className="tm-contact-form" method="POST">
            <div className="form-group">
              <input
                type="text"
                id="contact_name"
                name="user_name"
                className="form-control"
                placeholder="Nom"
                required=""
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="contact_email"
                name="user_email"
                className="form-control"
                placeholder="Email"
                required=""
              />
            </div>
            <div className="form-group">
              <textarea
                rows={5}
                id="contact_message"
                name="message"
                className="form-control"
                placeholder="Missatge"
                required=""
                defaultValue={""}
              />
            </div>
            <div className="tm-text-right">
              <button type="submit" className="btn tm-btn tm-btn-big">
                Envia
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-xl-7 col-lg-6 col-md-12 tm-contact-right">
        <div className="tm-contact-figure-block">
          <figure className="d-inline-block">
            <img src="SRC/img/img-06.jpg" alt="Image" className="img-fluid" />
            <figcaption className="tm-contact-figcaption">
              {infocontact}
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</div>
      <footer className="container tm-footer">
        <div className="row tm-footer-row">
          <p className="col-md-10 col-sm-12 mb-0">
            Copyright © 2013 CacaoDelight - Design:
            <a>+34 123456789</a>
          </p>  
        </div>
      </footer>
      {showScrollButton && (
        <div className="scroll-to-top">
          <button className="btn btn-primary" onClick={scrollToTop}>
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      )}
    </>
  );
}

export default homePage;
