import '../assets/styles/footer.styl'

export default {
  data () {
    return {
      author: 'someOne'
    }
  },
  render (h) {
    return (
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
