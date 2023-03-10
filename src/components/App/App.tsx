import styles from './App.module.css'
import {AppHeader} from "../AppHeader/AppHeader";
import {BurgerIngredients} from "../BurgerIngredients/BurgerIngredients";
import {BurgerConstructor} from "../BurgerConstructor/BurgerConstructor";

function App() {
  return (
      <div className={`${styles.App} ${styles.page}`}>
          <AppHeader/>
          <main className={`${styles.App} mb-10`}>
              <BurgerIngredients/>
              <BurgerConstructor/>
          </main>
      </div>
  );
}

export default App;
