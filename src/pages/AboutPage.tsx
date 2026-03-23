import { usePageMeta } from '@/shared/lib/seo'
import './pages.scss'

function AboutPage() {
  usePageMeta('Nosotros', 'Conoce la propuesta de Confesiones EC y como se organizan sus comunidades por sector.')
  return (
    <section className="surface-panel page-header">
      <span className="page-header__eyebrow">Sobre la comunidad</span>
      <h2 className="page-header__title">Un lugar para soltar historias que en tu entorno casi nunca se cuentan completas.</h2>
      <p className="page-header__description">
        Cada espacio esta pensado para leer, reaccionar y conversar con calma. La idea es que cada comunidad tenga su
        propio pulso, su propio humor y sus propias historias memorables dentro de Ecuador.
      </p>
      <div className="page-about-cards">
        <article className="surface-panel">
          <strong>Comunidades vivas</strong>
          <p>Iglesias, hospitales, empresas y otros sectores pueden tener su propio ritmo y sus conversaciones separadas.</p>
        </article>
        <article className="surface-panel">
          <strong>Participacion simple</strong>
          <p>Puedes publicar, comentar, valorar y reportar sin que la experiencia se sienta pesada o confusa.</p>
        </article>
        <article className="surface-panel">
          <strong>Lectura cuidada</strong>
          <p>El diseno prioriza contraste, ritmo visual y una experiencia comoda tanto en celular como en escritorio.</p>
        </article>
      </div>
    </section>
  )
}

export default AboutPage
