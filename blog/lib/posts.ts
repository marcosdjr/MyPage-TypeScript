import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const pastaDosPosts = path.join(process.cwd(), 'posts');

export function pegarPostsPorData() {

    {/*["entendendo-nextjs.md", "iniciando-com-spring.md"] */ }
    const nomeDosArquivos = fs.readdirSync(pastaDosPosts);

    //para andar pelo vetor, uso o map
    //teremos um vetor de objetos
    const dadosDosPosts = nomeDosArquivos.map(cadaArquivo => {

        //as duas barras normais indicam expressão regular. o cifrão indica q vai procurar no final
        {/* Pegando o nome do arquivo sem o .md */}
        const id = cadaArquivo.replace(/\.md$/, '');

        {/* C:aulas\blog\posts\entendendo-nextjs.md */}
        {/* C:aulas\blog\posts\iniciando-com-spring.md */}
        const caminhoDoArquivo = path.join(pastaDosPosts, cadaArquivo);
        const conteudoDoArquivo = fs.readFileSync(caminhoDoArquivo, 'utf-8');

        const resultadoDoMatter = matter(conteudoDoArquivo);

        return {
            id,
            ...(resultadoDoMatter.data as {date: string; title: string}),
        }
    })

    return dadosDosPosts.sort( (objeto1, objeto2) => {
        if (objeto1.date < objeto2.date) {
            return 1

        } else {
            return -1
        }
    } )

}

export function pegarTodosOsIds() {

    const nomeDosArquivos = fs.readdirSync(pastaDosPosts)
    return nomeDosArquivos.map(cadaArquivo => {
        return {
            //params eu uso no lugar do construtor, pq é dinâmico
            params: {
                id: cadaArquivo.replace(/\.md$/, '')
            }
        }

    })
}

//async pq se o arquivo for grande, a leitura dele vai demorar
export async function pegarConteudoParaPost(id: string) {

    const caminhoDoArquivo = path.join(pastaDosPosts, `${id}.md`);
    const conteudoDoArquivo = fs.readFileSync(caminhoDoArquivo, 'utf-8');
    const resultadoDoMatter = matter(conteudoDoArquivo);

{/*USAR O REMARK PARA CONVERTER PARA HTML */}

    const conteudoProcessado = await remark()
    .use(html)
    .process(resultadoDoMatter.content)

    const conteudoHtml = conteudoProcessado.toString()

    return {
        id,
        conteudoHtml,
        ...(resultadoDoMatter.data as {date: string; title: string}),
    }
}