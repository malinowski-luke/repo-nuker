import React from 'react'
import routes from './router'
import styles from './app.module.scss'

function App() {
  return <div className={styles.app}>{routes}</div>
}

export default App
