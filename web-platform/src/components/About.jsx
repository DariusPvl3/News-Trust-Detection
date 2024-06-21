import React from "react";
import '../styles/About.css';

export const About = () => {
    return (
        <div className="main">
            <div className="info-box">
                <div className="info-wrapper">
                    <h2>Ce este 'Check The Fake!'?</h2>
                    <p>
                        "Check The Fake!" este un proiect care îşi propune să ajute persoanele cu suspiciuni asupra unui articol de ştiri să verifice informaţia primită prin intermediul unui model de învăţare automată antrenat exclusiv pe ştiri în limba română.
                    </p>
                    <p>
                        Proiectul este momentan menit pentru a fi prezentat în cadrul susţinerii lucrării de licenţă a studentului Pavăl Darius-Cosmin la Facultatea de Matematică şi Informatică a Universităţii de Vest din Timişoara.
                    </p>
                </div>
            </div>
            <div className="info-box">
                <div className="info-wrapper">
                    <h2>Care este motivaţia acestui proiect?</h2>
                    <p>
                        Din punct de vedere statistic, ţara se confruntă de mulţi ani cu probleme legate de dezinformarea din presă, astfel românii nu au suficientă încredere în ştiri, sau ajung să creadă informaţii eronate, care sunt ulterior distribuite în masă.
                    </p>
                    <p>
                        Tocmai de aceea, personal, susţin că trebuie adusă această problemă la un nivel mai ridicat de recunoaştere şi investire a timpului în informare corectă.
                    </p>
                </div>
            </div>
            <div className="info-box">
                <div className="info-wrapper">
                    <h2>Cum funcţionează modelul?</h2>
                    <p>
                        Platforma foloseşte un model de învăţare automată, care a fost construit în jurul unei selecţii de ştiri în limba română, atât din surse de încredere, cât şi din surse cu mai puţină credibilitate. Publicaţiile alese fac parte din mai multe categorii, anume:
                    </p>
                    <ul>
                        <li>Publicaţii care inspiră încredere generală (Ştirile ProTV, Libertatea, Digi24)</li>
                        <li>Publicaţii cu o încredere variată, în funcţie de subiect sau public (RomâniaTV, RealitateaTV)</li>
                        <li>Publicaţii care nu inspiră încredere sau transmit teorii conspiraţioniste (ActiveNews)</li>
                    </ul>
                </div>
            </div>
            <div className="info-box">
                <div className="info-wrapper">
                    <h2>Cum au fost verificate articolele din procesul de învăţare?</h2>
                    <p>
                        Informaţiile distribuite în articolele selectate au fost verificate în mai multe surse de încredere, atât naţionale, cât şi internaţionale. De asemenea, pentru unele informaţii s-au folosit şi platformele de combatere a dezinformării din media românească.
                    </p>
                    <p>
                        Principalele subiecte alese au fost ştiri despre Covid-19 din ultimele 12 luni sau ştiri din politica recentă a României. Printre alte subiecte apar şi articole despre încălzirea globală, sănătate sau interese sociale.
                    </p>
                </div>
            </div>
        </div>
    );
};
