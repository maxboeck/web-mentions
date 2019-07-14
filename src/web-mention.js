import { LitElement, html, css } from 'lit-element'

class WebMention extends LitElement {
  constructor() {
    super()

    this.url = ''
    this.author = 'Anonymous'
    this.avatar = ''
    this.published = ''
  }

  static get properties() {
    return {
      url: { type: String },
      author: { type: String },
      avatar: { type: String },
      published: { type: String }
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      img {
        border-radius: 50%;
        object-fit: cover;
        margin-right: 0.5em;
        background-color: #ededed;
      }
      .meta,
      .meta > a {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
      .meta {
        margin-bottom: 0.5em;
      }
      .meta > a {
        margin-right: 1em;
      }
      time {
        font-size: 0.875em;
      }
    `
  }

  formatDate(iso) {
    const date = new Date(iso)
    const zeroPad = num => (num < 10 ? '0' + num : num)

    const dd = zeroPad(date.getDate())
    const MM = zeroPad(date.getMonth() + 1)
    const yyyy = date.getFullYear()
    const HH = zeroPad(date.getHours())
    const mm = zeroPad(date.getMinutes())

    return `${dd}.${MM}.${yyyy} - ${HH}:${mm}`
  }

  render() {
    return html`
      <div class="h-cite">
        <div class="meta">
          <a href=${this.url} class="u-url">
            <img
              src=${this.avatar}
              class="u-photo"
              width="40"
              height="40"
              alt=""
            />
            <span class="p-name">${this.author}</span>
          </a>
          <time datetime=${this.published} class="dt-published">
            ${this.formatDate(this.published)}
          </time>
        </div>
        <div class="p-content">
          <slot></slot>
        </div>
      </div>
    `
  }
}

customElements.define('web-mention', WebMention)
