var React = require('react');
var render = require('../../lib/render.jsx');

require('./about.scss');

var About = React.createClass({
    type: 'About',
    render: function () {
        return (
            <div className="inner">
                <h1>
                    <img src="/images/cat1.png" />
                    About Scratch
                </h1>

                <div className="intro">
                    <p>With Scratch, you can program your own interactive stories,
                     games, and animations — and share your creations with others in the online community. </p>

                    <p>Scratch helps young people learn to think creatively, reason systematically,
                    and work collaboratively — essential skills for life in the 21st century.</p>

                    <p>Scratch is a project of the Lifelong Kindergarten Group
                     at the MIT Media Lab. It is provided free of charge.</p>
                    <p>
                        <a href = "/parents/"> INFO FOR PARENTS </a> |
                        <a href = "/educators/"> INFO FOR EDUCATORS </a>
                    </p>
                </div>
                <div className="video">
                    <iframe src="https://player.vimeo.com/video/65583694?
                    title=0&byline=0&portrait=0" width="445" height="250" frameborder="0"
                    webkitallowfullscreen mozallowfullscreen allowfullscreen />
                </div>
                <div className="information">
                    <div className="leftcolumn">
                        <h2>Who Uses Scratch?</h2>
                        <img src="/images/about/who-uses-scratch.jpg" />
                        <p>Scratch is designed especially for ages 8 to 16, but
                        is used by people of all ages. Millions of people are creating
                        Scratch projects in a wide variety of settings, including homes, schools, museums,
                        libraries, and community centers.</p>
                        <h2>Around the World</h2>
                        <img src="/images/about/around-the-world.png" />
                        <p>Scratch is used in more than 150 different countries
                        and available in more than 40 languages. To change languages, click the menu at
                        the bottom of the page. Or, in the Project Editor, click the globe at the top of the page.
                        To add or improve a translation, see the
                            <a href="http://wiki.scratch.mit.edu/wiki/How_to_Translate_Scratch">
                        translation</a>
                             page.</p>
                        <h2>Quotes</h2>
                        <img src="images/about/quotes.gif" />
                        <p>The Scratch Team has received many emails from youth, parents, and educators
                        expressing thanks for Scratch. Want to see what people are saying? You can
                        read a collection of the <a href="/info/quotes">quotes</a> we&#39;ve received.</p>
                        <h2>Learn More About Scratch</h2>
                        <div className="moreinfolist">
                        <ul>
                            <li>
                                <a href="/help">Scratch Help Page</a>
                            </li>
                            <li>
                                <a href="/info/faq">Frequently Asked Questions</a>
                            </li>
                            <li>
                                <a href="/parents">Information for Parents</a>
                            </li>
                            <li>
                                <a href="/credits">Scratch Credits</a>
                            </li>
                        </ul>
                        </div>


                     </div>
                     <div className="rightcolumn">
                        <h2>Learn to Code, Code to Learn</h2>
                        <iframe src="https://embed-ssl.ted.com/talks/mitch_resnick_let_s_teach_kids_to_code.html"
                         scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
                        <p>The ability to code computer programs is an important part of literacy in today’s
                        society. When people learn to code in Scratch, they learn important strategies for
                        solving problems, designing projects, and communicating ideas.</p>
                        <h2>Scratch in Schools</h2>
                        <img src="/images/about/scratch-in-schools.jpg" />
                        <p>Students are learning with Scratch at all levels (from elementary school to college)
                        and across disciplines (such as math, computer science, language arts, social studies).
                        Educators share stories, exchange resources, ask questions, and find people on the
                        <a href="http://scratched.gse.harvard.edu/">ScratchEd website</a>.</p>
                        <h2>Research</h2>
                        <img src="/images/about/research-remix.png" />
                        <p>The MIT Scratch Team and collaborators are researching how people use and
                        learn with Scratch (for an introduction, see
                            <a href="http://web.media.mit.edu/~mres/papers/Scratch-CACM-final.pdf">
                            Scratch: Programming for All</a>).
                        Find out more about Scratch <a href="/info/research">research</a> and
                        <a href="/statistics">statistics</a> about Scratch.</p>
                        <h2>Support and Funding</h2>
                        <p>The Scratch project, initiated in 2003, has received generous support
                        from the National Science Foundation (grants 0325828, 1002713, 1027848, 1019396),
                        Intel Foundation, Microsoft, MacArthur Foundation, LEGO Foundation,
                        Code-to-Learn Foundation, Google, Dell, Fastly, Inversoft, and
                        MIT Media Lab research consortia. If you&#39;d like to support Scratch,
                        please see our <a href="https://secure.donationpay.org/codetolearn/">
                        donate page</a>,
                        or contact us at donate@scratch.mit.edu.</p>
                    </div>
                </div>
            </div>
        );
    }
});

render(<About />, document.getElementById('view'));
