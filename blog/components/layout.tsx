import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Teste from '../pages/teste';
import Projetos from '../pages/projetos';
import Contatos from '../pages/contato';
import Hobbies from '../pages/hobbies';
import styles from '../styles/layout.module.css';
import { Navbar, Nav, Button } from 'react-bootstrap';

import React from "react"

const meuNome = 'Marcos Domingues'
export const tituloDoSite = 'Marcos Domingues - Desenvolvedor'


export default function Layout(
    //tem que passar 'tipado'. a interrogação permite que tenha a home ou não, e se não tiver, não dá erro.
    { children, home }: { children: React.ReactNode, home?: boolean, }
) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel='icon' href='/favicon.ico' />
                <meta
                    name='Marcos Domingues Junior'
                    content='Uma página pessoal com informações básicas e blog integrado.'
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        tituloDoSite
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={tituloDoSite} />
                <meta name="twitter:card" content="summary_large_image" />

            </Head>

            <div className={styles.body}>
                <header className={styles.header}>

                    {
                        home ? (
                            <>
                                <Image
                                    priority
                                    src="/images/eu.jpeg"
                                    height={144}
                                    width={144}
                                    alt={meuNome}

                                />
                                <h1>{meuNome}</h1>
                            </>


                        ) : (
                            <></>
                        )
                    }

                </header>
                <main>

                    <div className='navBar'>
                        <Navbar className="justify-content-center" expand="sm">
                            <Nav>
                                <Nav.Link id="link-style" href="/">Hoobies</Nav.Link>
                                <Nav.Link id="link-style" href="/create">Contato</Nav.Link>
                                <Nav.Link id="link-style" href="/delete-all">Projetos</Nav.Link>
                                
                            </Nav>
                        </Navbar>
                    </div>
                    {/*
                    <Link href="/"><a>Hobbies</a></Link>
                    <Link href="/"><a>Contato</a></Link>
                    <Link href="/"><a>Projetos</a></Link>
                    <Link href="/"><a>Hobbies</a></Link>
                    */}
                    {children}
                </main>
                {/* testando se é verdadeiro */}
                {!home && (
                    <div className={styles.back}>
                        <Link href="/">
                            <a>← Retornar para o início</a>
                        </Link>

                    </div>

                )

                }
            </div>

        </div>


    )

}