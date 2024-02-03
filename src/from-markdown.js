

function fromMarkdown (opts = {}) {
  function enterWikiLink (token) {
    this.enter(
      {
        type: 'wikiLink',
        isType: token.isType ? token.isType : null,
        value: null,
        data: {
          alias: null,
        }
      },
      token
    )
  }

  function top (stack) {
    return stack[stack.length - 1]
  }

  function exitWikiLinkAlias (token) {
    const alias = this.sliceSerialize(token)
    const current = top(this.stack)
    current.data.alias = alias
  }

  function exitWikiLinkTarget (token) {
    const target = this.sliceSerialize(token)
    const current = top(this.stack)
    current.value = target
  }

  function exitWikiLink (token) {
    const wikiLink = this.stack[this.stack.length - 1]
    this.exit(token)
    // if (opts.markdownFolder && wikiLink.value.includes(`${opts.markdownFolder}/`)) {
    //   const [, ...value] = wikiLink.value.split(`${opts.markdownFolder}/`)
    //   wikiLink.value = value
    // }
    const wikiLinkTransclusion = wikiLink.isType === 'transclusions'

    let displayName
    let transclusionFormat

    if (wikiLinkTransclusion) {

    } else {

    }

    if (wikiLink.data.alias && !wikiLinkTransclusion) {
      displayName = wikiLink.data.alias
    }
    wikiLink.data.alias = displayName

  }

  return {
    enter: {
      wikiLink: enterWikiLink
    },
    exit: {
      wikiLinkTarget: exitWikiLinkTarget,
      wikiLinkAlias: exitWikiLinkAlias,
      wikiLink: exitWikiLink
    }
  }
}

export { fromMarkdown }
