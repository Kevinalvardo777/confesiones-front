import './AboutPage.scss'

function AboutPage() {
  return (
    <section className="about-page">
      <span>Sobre el proyecto</span>
      <h2>Un tablero de confesiones por comunidades universitarias.</h2>
      <p>
        El sitio organiza publicaciones por campus, permite votar con estrellas y encontrar historias concretas por
        fecha para que cada sección tenga identidad propia.
      </p>
      <div className="about-page__cards">
        <article>
          <strong>Routing</strong>
          <p>Inicio, secciones por universidad, ranking general y una pagina informativa.</p>
        </article>
        <article>
          <strong>Moderacion simple</strong>
          <p>Las confesiones se agregan en memoria y se muestran primero las mas recientes.</p>
        </article>
        <article>
          <strong>Jerarquia visual</strong>
          <p>Hero, tarjetas por seccion y paneles con contraste para facilitar lectura movil y desktop.</p>
        </article>
      </div>
    </section>
  )
}

export default AboutPage
