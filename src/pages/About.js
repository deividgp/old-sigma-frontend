function About() {
    return (
        <div style={{ backgroundColor: "#613d5f", height: "100%", overflowY: "auto" }}>
            <div style={{ padding: "20px" }}>
                The app I'm planning to make will be a messaging app similar to Discord, an app
                based on servers (public or private groups where users can interact through
                different channels that work like small forums to discuss a specific topic)
                for the 'gaming and casual area. The difference is that I want to focus my
                application on the professional and enterprise area mainly although the sectors
                mentioned above also have a place, depending on the server structure because the
                idea is to make them highly configurable by adding channels and roles to control
                user access among other options. It will also have some similarity to Slack but
                what I don't like about this platform is that it focuses too much on groups.
                I want to approach this part more like Discord because apart from interacting
                with servers you can also chat with users privately without needing to be inside
                a server. In addition, I also want to integrate all access to the groups on a
                single page like Discord does because in the web version of Slack you need to
                leave one server to enter another. In short: single-page application on all platforms.
            </div>

        </div>
    );
}

export default About;