import Head from 'next/head'
import { useState, useRef, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Project from '../components/Project'
import { RiBrushFill } from 'react-icons/ri'
import { HiPuzzle } from 'react-icons/hi'
import { FaHammer } from 'react-icons/fa'
import { GiArchiveResearch } from 'react-icons/gi'
import { AiFillGithub } from 'react-icons/ai'
import { BiLinkExternal } from 'react-icons/bi'
import { majorProjects, minorProjects } from '../projects'
import { IconContext } from 'react-icons'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

const Home = () => {
  function FadeInSection(props) {
    const [isVisible, setIsVisible] = useState(false)
    const domRef = useRef()
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting))
      })
      observer.observe(domRef.current)
    }, [])
    return (
      <div
        className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
        ref={domRef}
      >
        {props.children}
      </div>
    )
  }

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [show, setShow] = useState(false)

  const [errors, setErrors] = useState({})
  const [buttonText, setButtonText] = useState('Send')

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showFailureMessage, setShowFailureMessage] = useState(false)

  const handleShow = () => {
    show && setShow(false)
    !show && setShow(true)
  }

  const handleValidation = () => {
    let tempErrors = {}
    let isValid = true

    if (name.length <= 0) {
      tempErrors[name] = true
      isValid = false
    }
    if (email.length <= 0) {
      tempErrors[email] = true
      isValid = false
    }
    if (message.length <= 0) {
      tempErrors[message] = true
      isValid = false
    }

    setErrors({ ...tempErrors })
    console.log('errors', errors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let isValidForm = handleValidation()

    if (isValidForm) {
      setButtonText('Sending')

      const res = await fetch('/api/contact', {
        body: JSON.stringify({
          email: email,
          name: name,
          message: message,
          phone: phone,
          company: company,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const { error } = await res.json()
      if (error) {
        console.log(error)
        setShowSuccessMessage(false)
        setShowFailureMessage(true)
        setButtonText('Send')

        setName('')
        setEmail('')
        setMessage('')
        setPhone('')
        setCompany('')
        return
      }
      setShowSuccessMessage(true)
      setShowFailureMessage(false)
      setButtonText('Send')

      setName('')
      setEmail('')
      setMessage('')
      setPhone('')
      setCompany('')
    }
  }
  return (
    <div>
      <Head>
        <title>Sayben Codes</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://use.typekit.net/zug7ovq.css" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="description"
          content="A freelance web developer based in Jacksonville FL who's happy to help you and your business rock the net."
        />
        <meta
          name="keywords"
          content="coding, web development, web developer, jacksonville, FL, duval county, web design, SEO, freelancer, website builder, coder, programmer, portfolio"
        />
      </Head>
      <Sidebar />
      <NavBar />
      <section id="home" className="landing  ">
        <div className="mx-auto w-full lg:flex xl:pl-20">
          {' '}
          <article className="bg-dark h- xl:mar-left flex flex-col items-start justify-center px-20 pt-20 pb-40 lg:w-6/12">
            <p className="header-text">
              <span className="header-major">S</span>
              <span className="header-minor">ayben</span>
            </p>
            <p className="header-text">
              <span className="header-major">C</span>
              <span className="header-minor">odes</span>
            </p>
            <p className="mb-20 text-3xl font-thin text-white">
              My passion is bringing peoples' ideas to life on the web. Is yours
              next?
            </p>
            <a
              href="#contact"
              className="scale-btn w-2/3 border border-white py-1 px-2 text-center text-2xl font-thin text-white hover:cursor-pointer md:w-1/2 lg:w-5/12"
            >
              Lets Connect
            </a>
          </article>
          <div
            id="about"
            className="bg-blue-gradient-2 flex flex-col items-center justify-center pt-20 pb-40 lg:w-6/12 lg:px-10"
          >
            <article className="mx-auto flex w-3/4 flex-col justify-center">
              <h1 className="font-thick text-right text-2xl">Sabin Chambers</h1>
              <div className="about-me">
                <div className="about-run overflow-hidden p-2">
                  <h3 className="font mb-3 text-3xl">About Me</h3>
                  <p className="font">
                    My name is Sabin Chambers, though some know me as EJ. I'm an
                    online educated web developer from Virginia Beach, VA
                    currently living in Jacksonville Florida. I relish in
                    building polished and efficient websites for local
                    businesses and young professionals and entrepreneurs alike.
                    <br></br>
                    <br></br>Offering my services at a reasonable price to those
                    in my community, to see it built up, flourishing, and create
                    more opportunities within it for others to benefit from is
                    my vision. I want to see people doing better, more so now,
                    than ever.
                  </p>
                </div>
                <div className="about-run-clone overflow-scroll p-2 scrollbar-hide">
                  <h3 className="font mb-3 text-3xl">About Me</h3>
                  <p className="font">
                    My name is Sabin Chambers, though some know me as EJ. I'm an
                    online educated web developer from Virginia Beach, VA
                    currently living in Jacksonville Florida. I relish in
                    building polished and efficient websites for local
                    businesses and young professionals and entrepreneurs alike.
                    <br></br>
                    <br></br> Offering my services at a reasonable price to
                    those in my community, to see it built up, flourishing, and
                    create more opportunities within it for others to benefit
                    from is my vision. I want to see people doing better, more
                    so now, than ever.
                  </p>
                </div>
                <div className="about-overlay"></div>
                <div className="about-pic">
                  <Image
                    priority={true}
                    layout="fill"
                    width="90"
                    height="90"
                    alt="saybencodes headshot"
                    src="images/headshot.avif"
                  />
                </div>
              </div>

              <h1 className="z-100 font">
                Web Developer Based In Jacksonville FL
              </h1>
            </article>
          </div>
        </div>
      </section>
      <section
        id="work"
        className="projects bg-dark flex  w-full flex-col py-40"
      >
        <FadeInSection>
          <div className="lg:custom-container mx-auto w-full">
            <div className="project-header-major mx-auto w-3/4">
              <p className="mb-8 text-3xl font-thin text-white">
                Featured Projects
              </p>
              <p className="text-6xl font-thin text-white">Some of My Work</p>
              <div className="mt-1 mb-12 h-0.5 bg-white"></div>
            </div>
            <div className="major-projects-container mx-auto  w-3/4">
              {majorProjects.map((major) => (
                <Project key={major.id} major={major} />
              ))}
            </div>

            <div className="project-header-minor mx-auto w-3/4">
              <p className="mb-8 text-3xl font-thin text-white">
                Minor Projects
              </p>
              <p className="text-6xl font-thin text-white">
                A Few of My More Simple Creations
              </p>
              <div className="my-1 h-0.5 bg-white"></div>
            </div>
            <div className="mx-auto mb-24 mt-12 flex w-3/4 flex-col items-center justify-center gap-x-5 sm:gap-y-0 lg:flex-row">
              {minorProjects.map((minor) => (
                <div className="bg-royal-2 mb-12 flex-col justify-evenly overflow-hidden p-4 text-left font-thin text-white sm:w-full lg:h-80 lg:w-1/3">
                  <p className="font text-3xl">{minor.title}</p>
                  <p className="my-2">{minor.description}</p>
                  <p className="font mb-2 text-sm">{minor.stack.join(', ')}</p>
                  <div className="flex gap-x-2">
                    <a target="_blank" href={minor.link}>
                      <BiLinkExternal
                        className=" cursor-pointer text-gray-200 hover:text-white"
                        size={'1.3em'}
                      />
                    </a>
                    <a target="_blank" href={minor.repo}>
                      <AiFillGithub
                        className="cursor-pointer text-gray-200 hover:text-white"
                        size={'1.3em'}
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>
      <section id="deeper" className="deeper w-full bg-white py-40">
        <FadeInSection>
          <article className="mx-auto h-full w-3/4 ">
            <div className="deeper-top mb-24">
              <p className="font  text-6xl text-black">
                It's deeper than just building a website.
              </p>{' '}
              <div className="h-0.5 bg-gray-700"></div>
              <p className="my-6 text-2xl font-thin text-black">
                The goal is to craft an online hub inspired by your vision that
                you're proud to share with your clients.
              </p>
              <p className="text-2xl font-thin text-black">
                How do we do that?
              </p>
            </div>
            <div className="deeper-bot mx-auto mt-12 flex w-11/12 grid-cols-2 flex-col items-center justify-center gap-y-12 lg:flex-row">
              <div className="flex w-full flex-col items-center justify-center gap-y-12">
                <div className="deeper-comp comp-1 w-11/12">
                  <div className="top">
                    <p className="font text-3xl">Planning</p>
                    <div className="h-0.5 border border-black"></div>
                  </div>
                  <div className="bot my-3 flex items-center justify-between">
                    <IconContext.Provider
                      value={{
                        color: 'black',
                        size: '3em',
                      }}
                    >
                      <div className="mr-5 rounded-full border border-black p-1">
                        <HiPuzzle />
                      </div>
                    </IconContext.Provider>
                    <ul>
                      <li>
                        Connect to learn about the vision you have for your
                        business.
                      </li>
                      <li className="mt-3">
                        Identify the necessary components, funcitonalities, &
                        scope of the project.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className=" deeper-comp comp-2 w-11/12 lg:min-h-[170px]">
                  <div className="top">
                    <p className="font text-3xl">Design</p>
                    <div className="h-0.5 border border-black"></div>
                  </div>
                  <div className="bot my-3 flex items-center justify-between">
                    <IconContext.Provider
                      value={{
                        color: 'black',
                        size: '3em',
                      }}
                    >
                      <div className="mr-5 rounded-full border border-black p-1">
                        <RiBrushFill />
                      </div>
                    </IconContext.Provider>
                    <ul>
                      <li>
                        Sitemap and wireframing to craft a prototype visual that
                        will guide our production.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-y-12">
                <div className=" deeper-comp comp-3 w-11/12 lg:min-h-[170px]">
                  <div className="top">
                    <p className="font text-3xl">Research</p>
                    <div className="h-0.5 border border-black"></div>
                  </div>
                  <div className="bot my-3 flex items-center justify-between">
                    <IconContext.Provider
                      value={{
                        color: 'black',
                        size: '3em',
                      }}
                    >
                      <div className="mr-5 rounded-full border border-black p-1">
                        <GiArchiveResearch />
                      </div>
                    </IconContext.Provider>
                    <ul>
                      <li>
                        Investigate your niche, audience, and competitors to
                        devise effective SEO friendly content.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className=" deeper-comp comp-4 w-11/12 lg:min-h-[170px]">
                  <div className="top">
                    <p className="font text-3xl">Construction</p>
                    <div className="h-0.5 border border-black"></div>
                  </div>
                  <div className="bot my-3 flex items-center justify-between">
                    <IconContext.Provider
                      value={{
                        color: 'black',
                        size: '2em',
                      }}
                    >
                      <div className="mr-5 rounded-full border border-black p-3">
                        <FaHammer />
                      </div>
                    </IconContext.Provider>
                    <ul>
                      <li>
                        Use the appropriate tech stack to bring your specially
                        designed virtual flagship to life.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </FadeInSection>
      </section>
      <section id="services" className="services w-full ">
        <div className="lg:flex">
          <article className="lg:mar-left bg-dark  flex-1 py-40 text-white lg:px-20">
            {' '}
            <FadeInSection>
              <div className="mx-auto w-3/4">
                <p className="text-6xl font-thin">Services</p>
                <p className="my-3 text-3xl font-thin">
                  What I can do for you.
                </p>
                <div className="my-1 h-0.5 bg-white"></div>
                <p className="my-8 block text-2xl font-thin">
                  I take great pride in my work. Beyond that however, I pride
                  myself in the value I can bring to a community through my
                  creative talents as well as my technical skills.
                </p>
                <p className="text-2xl font-thin">
                  Ultimately, I want to see the people I work with go on to
                  flourish. To accomplish that, I offer a variety of services
                  that I have fostered proficiency in through study and also as
                  hobbies for the sake of expression.
                </p>
                <ul className="mt-16 flex w-full flex-col items-center justify-between text-xl font-thin no-underline md:flex-row md:underline">
                  <li>Web Design</li>
                  <li>Web Development</li>
                  <li>Content Photography</li>
                  <li>Content Writing</li>
                </ul>
              </div>
            </FadeInSection>
          </article>
          {/* <div className="bg-blue-gradient-3 flex flex-col items-center justify-center py-40 px-2 text-black lg:w-5/12 lg:px-10">
            <div className="w-10/12">
              <div className="shadow-light relative block w-full rounded-md p-4 ">
                <IconContext.Provider
                  value={{
                    color: 'black',
                    size: '1.5em',
                  }}
                >
                  <div className="shadow-light absolute -top-3 -left-3  rounded-full p-3">
                    <AiFillLayout />
                  </div>
                </IconContext.Provider>
                <p className="font text-center text-3xl">Web Design</p>
              </div>
              <div className="shadow-light relative my-5 block w-full rounded-md  p-4 ">
                <IconContext.Provider
                  value={{
                    color: 'black',
                    size: '1.5em',
                  }}
                >
                  <div className="shadow-light absolute -top-3 -left-3  rounded-full p-3">
                    <BiCode />
                  </div>
                </IconContext.Provider>
                <p className="font text-center text-3xl">Web Development</p>
              </div>
              <div className="shadow-light relative my-5 block w-full rounded-md  p-4 ">
                <IconContext.Provider
                  value={{
                    color: 'black',
                    size: '1.5em',
                  }}
                >
                  <div className="shadow-light absolute -top-3 -left-3  rounded-full p-3">
                    <AiOutlineFileSearch />
                  </div>
                </IconContext.Provider>
                <p className="font text-center text-3xl">SEO</p>
              </div>
              <div className="shadow-light relative my-5 block w-full rounded-md p-4  ">
                <IconContext.Provider
                  value={{
                    color: 'black',
                    size: '1.5em',
                  }}
                >
                  <div className="shadow-light absolute -top-3 -left-3  rounded-full p-3">
                    <BsFillCameraFill />
                  </div>
                </IconContext.Provider>
                <p className="font text-center text-3xl">Photography</p>
              </div>
              <div className="shadow-light relative my-5 block w-full rounded-md p-4  ">
                <IconContext.Provider
                  value={{
                    color: 'black',
                    size: '1.5em',
                  }}
                >
                  <div className="shadow-light absolute -top-3 -left-3  rounded-full p-3">
                    <BsFillKeyboardFill />
                  </div>
                </IconContext.Provider>
                <p className="font text-center text-3xl">Content Creation</p>
              </div>
            </div>
          </div>{' '} */}
        </div>
      </section>
      <section
        id="contact"
        className="contact bg-blue-gradient-1 relative flex  w-full flex-col items-center justify-center py-40"
      >
        <div className="lg:custom-container flex w-3/4 flex-col items-center justify-center">
          <div className="scroll-container w-full">
            <div className="scroll-text text-right text-6xl font-thin">
              Get In Touch
            </div>
          </div>
          <FadeInSection>
            <p className="font my-24 text-center text-3xl">
              My inbox is open to discuss new opportunities, questions, or
              discussion concerning code and programming. I'll get back to you
              as soon as I can!
            </p>
            <div
              onClick={handleShow}
              className="font scale-btn relative mx-auto w-1/3 border border-black p-1 text-center text-xl hover:cursor-pointer"
            >
              Send a Message
            </div>
          </FadeInSection>
        </div>
        <div
          className={`modal border- absolute rounded-lg border-2 border-slate-900 ${
            show && 'fade-trans'
          } bg-blue-gradient-1 w-3/4 p-5`}
        >
          <div className="flex items-center justify-between">
            <h2 className="font mb-3 text-3xl">Get In Touch</h2>
            <h2
              onClick={handleShow}
              className="font mb-3 cursor-pointer text-3xl"
            >
              x
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-x-3">
              <input
                className="w-1/2 rounded-sm p-1 focus:outline-none"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                disabled={!show}
                placeholder="Name"
              />
              {errors?.name && <p>Name cannot be empty.</p>}
              <input
                className="w-1/2 rounded-sm  p-1 focus:outline-none"
                name="company"
                type="text"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value)
                }}
                disabled={!show}
                placeholder="Company"
              />
            </div>
            <div className="my-5 flex gap-x-3">
              <input
                className="w-1/2 rounded-sm  p-1 focus:outline-none"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                disabled={!show}
                placeholder="Email"
              />
              {errors?.email && <p>Email cannot be empty.</p>}
              <input
                className="w-1/2 rounded-sm p-1 focus:outline-none"
                name="phone"
                type="text"
                value={phone}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                onChange={(e) => {
                  setPhone(e.target.value)
                }}
                disabled={!show}
                placeholder="Phone Number"
              />
            </div>
            <div className="block">
              <textarea
                className="w-full rounded-sm p-1 focus:outline-none"
                name="message"
                type="text"
                required
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value)
                }}
                disabled={!show}
                placeholder="Enter Your Message"
                rows="5"
              />
            </div>

            {errors?.message && <p>Message body cannot be empty.</p>}
            <input
              className="scale-btn send-btn my-4 w-2/5 cursor-pointer rounded-md p-1 lg:w-1/6"
              type="submit"
              value={buttonText}
            />
            <div>
              {showSuccessMessage && (
                <p>Thank You! Your message has been delivered!</p>
              )}
              {showFailureMessage && (
                <p>Something went wrong, please try again.</p>
              )}
            </div>
          </form>
        </div>
        <div
          onClick={handleShow}
          className={`modal-overlay absolute h-full w-full bg-black  ${
            show && 'fade-trans'
          }`}
        ></div>
      </section>
      <Footer />
    </div>
  )
}

export default Home
