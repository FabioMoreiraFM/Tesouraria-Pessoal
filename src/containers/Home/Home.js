import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import SideDrawer from 'components/Navigation/SideDrawer/SideDrawer';
import Content from './Content/Content';
import Dashboard from './Content/Dashboard/Dashboard';
import Debts from './Content/Debts/Debts';
import Income from './Content/Income/Income';
import Assets from './Content/Assets/Assets';

import {ReactComponent as DebtIcon} from 'assets/dividas.svg'
import {ReactComponent as DashboardIcon} from 'assets/painelControle.svg'
import {ReactComponent as AssetsIcon} from 'assets/patrimonio.svg'
import {ReactComponent as IncomeIcon} from 'assets/receitas.svg'

import styles from './Home.module.css'
import Manager from './Content/Debts/Manager/Manager';

export class Home extends Component {    
    render() {
        let routes = (
            <Switch>
                <Route path="/home/dashboard" render={() => <Content title="Painel de Controle" subtitle="Quadros resumitivos com as principais informações para tomadas de decisão." icon={<DashboardIcon />} showNotifications><Dashboard/></Content>} />
                <Route path="/home/debts" render={() => <Content title="Dívidas" subtitle="Gerencie suas dívidas, acompanhe os prazos para pagamento e as variações ao longo do tempo." icon={<DebtIcon />}><Debts/></Content>} />
                <Route path="/home/debtManager" render={() => <Content title="Dívidas" subtitle="Gerencie suas dívidas, acompanhe os prazos para pagamento e as variações ao longo do tempo." icon={<DebtIcon />}><Manager/></Content>} />
                <Route path="/home/income" render={() => <Content title="Receitas" subtitle="Acompanhe o crescimento das suas receitas, compare suas receitas com as dívidas atuais." icon={<IncomeIcon />}><Income/></Content>} />
                <Route path="/home/assets" render={() => <Content title="Patrimônio" subtitle="Administre seu patrimônio, visualize seus aportes e rentabilidade mensal." icon={<AssetsIcon />}><Assets/></Content>} />
            </Switch>
        )
        
        return (
            <div className={styles.Home}>
                <SideDrawer />                
                {routes}
            </div>
        );
    }
}

export default Home;