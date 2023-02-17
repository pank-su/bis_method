
class NavEl {
    name: String
    icon: JSX.Element
    content: JSX.Element
    constructor(name: String, icon: JSX.Element, content: JSX.Element) {
        this.name = name
        this.icon = icon
        this.content = content
    }
}

export default NavEl