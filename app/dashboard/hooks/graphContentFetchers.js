export const postsPreviewQuery = `query BlogPost {\n  blogPostCollection {\n    items {\n      title\n      headerImage {\n        title\n        fileName\n        url\n      }\n      blogInsight {\n        insight\n      }\n    }\n  }\n}`;

export const getOnePostQuery = (blogPostTitle) => {
    return {
        query: `query BlogPost($where: BlogPostFilter) {\r\n  blogPostCollection(where: $where) {\r\n    items {\r\n      mainParagraph {\r\n        json\r\n      }\r\n      blogInsight {\r\n        insight\r\n      }\r\n      headerImage {\r\n        title\r\n        url\r\n      }\r\n    }\r\n  }\r\n}`,
        variables: {"where": {"title": `${blogPostTitle}`}}
    }
}

