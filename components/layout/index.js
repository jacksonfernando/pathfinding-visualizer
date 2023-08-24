import layoutStyle from './layout.module.css'
import Head from 'next/head'

const Layout = ({ children }) => {
  return (
    <div className={layoutStyle.container}>
      <Head>
        <link rel="icon" href='/favicon.ico'></link>
        <meta
          name='Pathfinding visualizer'
          content='All pathfinding algorithm visualizer'
        />
      </Head>
      <main>{children}</main>
    </div>
  )
}

export default Layout
