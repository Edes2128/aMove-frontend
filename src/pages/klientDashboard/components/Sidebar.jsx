import React from 'react'
import {Link} from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className="klient-dashboard-sidebar" >
            <div className="sidebar-logo">
                    <img width="120" height="120" src="/move-logo.png" alt=""/>
            </div>
            <div className="sidebar-links">
                <Link to="/klient" >Home</Link>
                <Link to="/klient/porosite" >Porosite</Link>
                <Link to="/klient/produktet">Produktet</Link>
            </div>
        </div>
    )
}
