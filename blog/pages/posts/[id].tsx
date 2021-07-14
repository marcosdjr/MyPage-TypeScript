import Layout from "../../components/layout";
import { pegarTodosOsIds, pegarConteudoParaPost } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/data";
import { GetStaticProps, GetStaticPaths } from "next";
import utilStyles from "../../styles/itens.module.css";

export default function Post({
    dadosDoPost
}: {
    dadosDoPost: {
        title: string
        date: string
        conteudoHtml: string
    }
}) {
    return (
        <Layout>
            <Head><title>{dadosDoPost.title}</title></Head>
            <article>
                <h1 className={utilStyles.headingXL}>{dadosDoPost.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dataString={dadosDoPost.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: dadosDoPost.conteudoHtml }} />
            </article>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const caminhos = pegarTodosOsIds();
    return {
        paths: caminhos,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const dadosDoPost = await pegarConteudoParaPost(params?.id as string)

    return {
        props: {
            dadosDoPost
        }
    }
}