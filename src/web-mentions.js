import { LitElement, html, css } from 'lit-element'

class WebMentions extends LitElement {
    constructor() {
        super()

        this.webmentions = []
        this.url = window.location.href
        this.types = ['in-reply-to', 'like-of', 'repost-of', 'mention-of']
        this.size = 20
        this.page = 0
        this.isLoading = false
    }

    static get properties() {
        return {
            url: { type: String },
            size: { type: Number },
            page: { type: Number },
            types: { type: Array },
            webmentions: { type: Array, attribute: false },
            isLoading: { type: Boolean, attribute: false }
        }
    }

    static get styles() {
        return css`
            :host {
                display: block;
            }
        `
    }

    connectedCallback() {
        super.connectedCallback()
        this.fetchWebmentions()
    }

    buildQueryString(data) {
        const query = []
        for (let param in data) {
            if (data.hasOwnProperty(param)) {
                const value = data[param]
                if (Array.isArray(value)) {
                    value.forEach(entry => {
                        query.push(`${param}[]=${encodeURIComponent(entry)}`)
                    })
                } else {
                    query.push(`${param}=${encodeURIComponent(value)}`)
                }
            }
        }
        return query.join('&')
    }

    async fetchWebmentions() {
        const API_ORIGIN = 'https://webmention.io/api/mentions.jf2'
        const query = this.buildQueryString({
            target: this.url,
            'wm-property': this.types,
            'per-page': this.size,
            page: this.page
        })

        try {
            this.isLoading = true
            const response = await fetch(`${API_ORIGIN}?${query}`)
            if (response.ok) {
                const json = await response.json()
                this.webmentions = json.children
                this.isLoading = false
            }
        } catch (err) {
            console.error(err)
            this.isLoading = false
        }
    }

    render() {
        if (this.isLoading) {
            return html`
                <p>Loading...</p>
            `
        }

        return html`
            <div>Webmentions for ${this.url}</div>
        `
    }
}

customElements.define('web-mentions', WebMentions)
