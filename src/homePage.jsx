import React, { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';
import './css/all.min.css'; // Importa tu archivo CSS aquí
import './css/bootstrap.min.css'; // Importa tu archivo CSS aquí
import './css/tooplate-style.css'; // Importa tu archivo CSS aquí
import translations from './Translations'; // Importa el objeto de traducciones
import { db } from './components/login/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

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
  const [language, setLanguage] = useState('ca'); // Estado para controlar el idioma seleccionado
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'productos')); // Asegúrate de que tienes una colección llamada 'productos' en Firestore
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div className="product-list">
      <h1>Productos de Cacao</h1>
      {products.map((product) => (
        <div key={product.id} className="product-item" onClick={() => handleProductClick(product)}>
          <img src={product.image} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Precio: ${product.price}</p>
        </div>
      ))}
    </div>
  );


  // Función para cambiar el idioma a español
  const switchToSpanish = () => {
    setLanguage('es');
  };

  // Función para cambiar el idioma a inglés
  const switchToEnglish = () => {
    setLanguage('en');
  };

  // Función para cambiar el idioma a catalán
  const switchToCatalan = () => {
    setLanguage('ca');
  };

  const getContentByLanguage = () => {
    return translations[language];
  };

  const { title, logIn, introduction, sustainability, contact, fbPage, queEsTitle, queEsText, passionText, conoceTitle, conoceText, educationText, title3, title4, title5, content1, content2, content3, infocontact } = getContentByLanguage();

  const [featuresRef, featuresInView] = useInView({ threshold: 0.5 });
  const [companyRef, companyInView] = useInView({ threshold: 0.5 });
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

  const [activeTab, setActiveTab] = useState('vision'); // Estado para controlar la pestaña activa

  const handleTabClick = (tabId) => {
    setActiveTab(tabId); // Cambia el estado al ID de la pestaña seleccionada
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

  const homeAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const contactAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  // Estado y efecto para controlar el carrusel
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "src/img/agricultorhome1.jpg",
    "src/img/fotostockvainacacao.jpg",
    "src/img/vainacacaooberta.jpg",
    "src/img/dona1.jpg"
  ];

  return (
    <>
      {/* page header */}
      <animated.div style={homeAnimation}>
        <div className="container" id="home">
          <div className="col-12 text-center">
            <div className="tm-page-header">
              <img src="src\img\logo.webp" alt="logo" className="logo" />
              <h1 className="d-inline-block text-uppercase">{title}</h1>
            </div>
          </div>
        </div>
        <div className='botontrad'>
          <button className='btn-31' onClick={switchToSpanish}>
            <span className='text-container'>
              <span className='text'>Español</span>
            </span>
          </button>
          <button className='btn-31' onClick={switchToEnglish}>
            <span className='text-container'>
              <span className='text'>Inglés</span>
            </span>
          </button>
          <button className='btn-31' onClick={switchToCatalan}>
            <span className='text-container'>
              <span className='text'>Catalán</span>
            </span>
          </button>
        </div>
      </animated.div>

      {/* navbar */}
      <div className="tm-nav-section">
        <div className="container">
          <div className="row">
            <div className="col-13">
              <nav className="navbar navbar-expand-md navbar-light navbar-custom">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#tmMainNav"
                  aria-controls="tmMainNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
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
                      <a className="nav-link" onClick={() => scrollToSection('features')}>
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
      </div>

      {/* Features */}
      <animated.div ref={featuresRef} className="container tm-features-section" id="features" style={featuresInView ? slideAnimation : {}}>
        <div className="container tm-features-section" id="features">
          <div className="row tm-features-row">
            <section className="col-md-6 col-sm-12 tm-feature-block">
              <header className="tm-feature-header">
                <i className="fas fa-5x fa-anchor tm-feature-icon" />
                <h3 className="tm-feature-h">{queEsTitle}</h3>
              </header>
              <p>{queEsText}</p>
              <p>{passionText}</p>
            </section>
            <section className="col-md-6 col-sm-12 tm-feature-block">
              <header className="tm-feature-header">
                <i className="fas fa-5x fa-atom tm-feature-icon" />
                <h3 className="tm-feature-h">{conoceTitle}</h3>
              </header>
              <p>{conoceText}</p>
              <p className='segundo-texto-info'>{educationText}</p>
            </section>
          </div>
        </div>
      </animated.div>

      {/* Collapsible cards */}
      <section className="container" style={{ backgroundColor: '#f3ece6' }}>
        <div className="row-products">
          <div className="col-15">
            <CollapsibleCard title={title3} content={content1} />
            <CollapsibleCard title={title4} content={content2} />
            <CollapsibleCard title={title5} content={content3} />
          </div>
        </div>
      </section>

      {/* Contact */}
      <animated.div style={contactAnimation}>
        <section className="container tm-contact-section" id="contact">
          <div className="row">
            <div className="col-xl-5 col-lg-6 col-md-12 tm-contact-left">
              <div className="tm-contact-form-container ml-auto mr-0">
                <header>
                  <h2 className="tm-contact-header">Contacte</h2>
                </header>
                <form action="/enviar-correo" className="tm-contact-form" method="POST">
                  <div className="form-group">
                    <input type="text" id="contact_name" name="user_name" className="form-control" placeholder="Nom" required />
                  </div>
                  <div className="form-group">
                    <input type="email" id="contact_email" name="user_email" className="form-control" placeholder="Email" required />
                  </div>
                  <div className="form-group">
                    <textarea rows={5} id="contact_message" name="message" className="form-control" placeholder="Missatge" required defaultValue={""} />
                  </div>
                  <div className="tm-text-right">
                    <button type="submit" className="btn tm-btn tm-btn-big">Envia</button>
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
      </animated.div>

      <footer className="container tm-footer">
        <div className="row tm-footer-row">
          <p className="col-md-10 col-sm-12 mb-0">
            Copyright © 2013 CacaoDelight - Design: <a>+34 123456789</a>
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
