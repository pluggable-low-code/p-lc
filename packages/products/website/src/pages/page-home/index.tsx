import { useLatestFn } from '@p-lc/react-shared'
import { Button } from 'antd'
import { BrightStar, Github, IceCream } from 'iconoir-react'
import type { FC } from 'react'
import { memo } from 'react'
import { useHref } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import IMG_BG from '../../assets/bg.webp'
import { Nav } from '../../components/nav'
import { URL_P_LC_GITHUB } from '../../constants'
import { Card } from './card'

/**
 * 首页
 */
const PageHome: FC = memo(() => {
  const hrefDocsQuickStart = useHref('/docs/quick-start')
  const hrefDemoAntdTodo = useHref('/demo/antd-todo')
  const hrefDemoRav = useHref('/demo/rav')
  const hrefDemoLcTypes = useHref('/demo/lc-types')
  const handleGetStartedBtnClick = useLatestFn(() => {
    open(hrefDocsQuickStart)
  })
  const handleGithubBtnClick = useLatestFn(() => {
    open(URL_P_LC_GITHUB)
  })
  return (
    <Container>
      <GlobalStyle />
      <Bg>
        <img src={IMG_BG} />
      </Bg>
      <Nav docs />
      <TitleBlock>
        <h1 className="title">
          Everything in p-lc (Pluggable Low-Code) is a plugin
        </h1>
        <div className="actions">
          <Button type="primary" onClick={handleGetStartedBtnClick}>
            Get started
          </Button>
          <Button onClick={handleGithubBtnClick}>
            <Github /> Github
          </Button>
        </div>
      </TitleBlock>
      <Heading1>Why p-lc ?</Heading1>
      <Reasons>
        <ReasonCard
          icon={<BrightStar />}
          title="Dogfooding"
          content="There are no built-in features, only built-in plugins. So we are confident that you can achieve any feature with the new plugin."
        />
        <ReasonCard
          icon={<BrightStar />}
          title="Framework agnostic"
          content="The core part (plugins) of the runtime only maintains data and logic. View-related features are added through additional plugins."
        />
        <ReasonCard
          icon={<BrightStar />}
          title="Partial bootstrapping"
          content="In addition to the previewer, the element attributes editing form is also implemented through runtime rendering. The form is built through the editor."
        />
      </Reasons>
      <Heading1>Demos</Heading1>
      <Demos>
        <ReasonCard
          icon={<IceCream />}
          title="Antd"
          content="In progress."
          to={hrefDemoAntdTodo}
        />
        <ReasonCard
          icon={<IceCream />}
          title="Minimal React & Vue"
          content="Manually edit UIDL."
          to={hrefDemoRav}
        />
        <ReasonCard
          icon={<IceCream />}
          title="Low-code types"
          content="Build the element attributes editing form."
          to={hrefDemoLcTypes}
        />
      </Demos>
    </Container>
  )
})

const Container = styled.div`
  display: flow-root;
  color: #fff;
  padding: 64px 0;
`

const TitleBlock = styled.div`
  margin: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-top: 0;
    font-size: 3rem;
    text-align: center;
  }

  .actions {
    display: flex;

    button {
      margin: 12px;
    }
  }
`

const Heading1 = styled.h1`
  margin-top: 60px;
  text-align: center;
`

const Reasons = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px min(50px, 4%);
`

const ReasonCard = styled(Card)`
  width: 30%;
  max-width: 400px;
`

const Demos = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px min(50px, 4%);
  flex-wrap: wrap;
`

const GlobalStyle = createGlobalStyle`
  body {
    background: #000;
  }
`

const Bg = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  pointer-events: none;
  user-select: none;
  overflow: hidden;

  > img {
    width: 90%;
  }
`

export default PageHome
