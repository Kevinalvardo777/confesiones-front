import './AuthSplitTemplate.scss'

interface AuthSplitTemplateProps {
  title: string
  description: string
  children: React.ReactNode
}

function AuthSplitTemplate({ title, description, children }: AuthSplitTemplateProps) {
  return (
    <div className="template-auth-split">
      <section className="surface-panel page-header template-auth-split__intro">
        <span className="page-header__eyebrow">Acceso seguro</span>
        <h2 className="page-header__title">{title}</h2>
        <p className="page-header__description">{description}</p>
      </section>
      {children}
    </div>
  )
}

export default AuthSplitTemplate
