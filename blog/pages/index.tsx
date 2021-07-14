import Layout, { tituloDoSite } from '../components/layout';
import Head from 'next/head';
import Data from '../components/data';
import { pegarPostsPorData } from '../lib/posts';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import utilStyles from '../styles/itens.module.css';

export default function Home({
  dadosDosPosts

}: {
  dadosDosPosts: {
    date: string
    title: string
    id: string
  }[]

}) {

  return (
    //ele já entende que vc está passando um html (euSouAHome)
    <Layout home>
      <Head>
        <title>{tituloDoSite}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>🤩Saudações, pessoa!🤩</p>
        <p>
        "De desenvolvedor, psicólogo e louco, todo mundo tem um pouco", eles disseram. Eu acreditei e fui me especializar nas duas primeiras áreas 🤓 <br /><br />
                            Há 12 anos, trabalho no maior Operador Logístico do país - Correios. Atuo nos últimos 6 anos como coordenador de unidades operacionais, onde assumi desde atividades de gestão de equipes com 40 colaboradores (avaliação de desempenho e resultados, controle da jornada de trabalho e demais controles administrativos), até rotinas estratégicas que abrangem indicadores de toda prática de desempenho e qualidade operacional, focando na gestão de perdas e processos de melhoria contínua. 📈
        </p>
        <p>
          Amante da tecnologia e buscando novas oportunidades de carreira na área, iniciei estudos na Blue Edtech visando solidificar e atualizar conhecimentos, adquiridos tanto informalmente quanto na experiência profissional, para que possa alinhar a construção atual às tendências do mercado. #GoBluemers 🚀
        </p>
        <p>
          Também sou formado em Psicologia e estou finalizando pós-graduação em Psicoterapia Junguiana, que dão embasamento para uma visão crítica e melhor direcionamento do ser-humano dentro de diferentes perspectivas de uma cultura organizacional. 🧠
          </p>
        
        <p>Para mais informações, acesse o meu <a href="https://www.linkedin.com/in/marcos-domingues-911507166/">LinkedIn</a>.</p>

      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {
            dadosDosPosts.map(({ date, title, id }) => (

              <li className={utilStyles.listItem} key={id}>
                {/* TITULO DO POST */}
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Data dataString={date} />
                </small>
              </li>
            ))
          }
        </ul>
      </section>

    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const dadosDosPosts = pegarPostsPorData();
  return {
    props: {
      dadosDosPosts
    }
  }
}
