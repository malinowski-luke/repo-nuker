import React from 'react'
import routes from './router'
import Toast from './components/Toast/Toast'

import styles from './app.module.scss'

const App: React.FC = () => {
  return (
    <>
      <Toast />
      <div className={styles.app}>{routes}</div>
    </>
  )
}

export default App
