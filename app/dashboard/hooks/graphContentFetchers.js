// export const postsPreviewQuery = `query BlogPost {\n  blogPostCollection {\n    items {\n      title\n      headerImage {\n        title\n        fileName\n        url\n      }\n      blogInsight {\n        insight\n      }\n    }\n  }\n}`;

export const postsPreviewQuery = `query BlogPost {\n  blogPostCollection {\n    items {\n      title\n      headerImage {\n        title\n        fileName\n        url\n      }\n      blogInsight {\n        insight\n      }\n      sys {\n        id\n        publishedAt\n      }\n      author {\n        name\n        profileImage {\n          url\n        }\n      }\n      titleSlug\n    }\n  }\n}`

export const getOnePostQuery = (blogPostTitle) => {
    console.log({blogPostTitle})
    return {
        query: `query BlogPost($where: BlogPostFilter) {\r\n  blogPostCollection(where: $where) {\r\n    items {\r\n      mainParagraph {\r\n        json\r\n      }\r\n      blogInsight {\r\n        insight\r\n      }\r\n      headerImage {\r\n        title\r\n        url\r\n      }\r\n      author {\r\n        name\r\n        profileImage {\r\n          url\r\n        }\r\n      }\r\n      sys {\r\n        id\r\n        firstPublishedAt\r\n        publishedAt\r\n      }\r\n      title\r\n      titleSlug\r\n    }\r\n  }\r\n}`,
        variables: {"where": {"titleSlug": `${blogPostTitle}`}}
    }
}

export const privacyPolicyQuery = {
    query: `query PrivacyPolicy($privacyPolicyId: String!) {\r\n  privacyPolicy(id: $privacyPolicyId) {\r\n    contractDetails {\r\n      json\r\n    }\r\n  }\r\n}`,
    variables: {"privacyPolicyId": "6wxwEvGQ6wMykXuHGTRMhS"}
}

export const eventsQuery = `query EventCollection {\r\n  eventCollection {\r\n    items {\r\n      eventDate\r\n     \r\n onlineLink     description\r\n      eventFlyer {\r\n        url\r\n        title\r\n      }\r\n      eventName\r\n      venue {\r\n        lat\r\n        lon\r\n      }\r\n    }\r\n  }   \r\n}`;
