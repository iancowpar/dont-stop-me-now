import styles from './ZeroTranslationStack.module.css'
import {
  LayerOneVignette,
  LayerTwoVignette,
  LayerThreeVignette,
} from './ZeroTranslationVignettes'

export default function ZeroTranslationStack() {
  return (
    <div className={styles.page}>
      <article className={styles.poster}>
        <header className={styles.topbar}>
          <span className={styles.chip}>
            <span className={styles.chipDot} /> Team AI Architecture
          </span>
          <div className={styles.authors}>
            <span className={styles.authorChip}>
              <span className={styles.authorAvatar} /> The Unofficial Leader
            </span>
            <span className={styles.authorChip}>
              <span className={styles.authorAvatar} /> Field Note · Vol. 03
            </span>
          </div>
        </header>

        <h1 className={styles.title}>
          How to Build a{' '}
          <span className={styles.titleHighlight}>Zero-Translation</span> Stack:
          3 Layers
        </h1>

        <div className={styles.layout}>
          <div className={styles.leftCol}>
            <section className={styles.layerDesc}>
              <h3>
                Layer 3:
                <br />
                Shared Standards
              </h3>
              <p className={styles.layerSub}>how the system earns trust over time</p>
              <hr />
              <div className={styles.bullets}>
                <p>
                  <b>Explicit quality norms:</b> the team can name what good
                  sounds like and correct it when it drifts.
                </p>
                <p>
                  <b>Encoded learnings:</b> feedback flows back into Layer 1, so
                  the system gets smarter as it&rsquo;s used.
                </p>
                <p>
                  <b>Adoption discipline:</b> no new capability rolls out until
                  shared context is updated.
                </p>
              </div>
            </section>

            <section className={styles.layerDesc}>
              <h3>Layer 2: Shared Language</h3>
              <p className={styles.layerSub}>how the team asks questions</p>
              <hr />
              <div className={styles.bullets}>
                <p>
                  <b>Shared prompt patterns:</b> not power users hoarding
                  techniques — frameworks the whole team writes from.
                </p>
                <p>
                  <b>Common vocabulary:</b> the team can say &ldquo;this sounds
                  generated&rdquo; and everyone knows what that means.
                </p>
                <p>
                  <b>Peer learning loops:</b> output is handed off, not hoarded.
                </p>
              </div>
            </section>

            <section className={styles.layerDesc}>
              <h3>Layer 1: Shared Foundation</h3>
              <p className={styles.layerSub}>what feeds the system</p>
              <hr />
              <div className={styles.bullets}>
                <p>
                  <b>Institutional memory:</b> project knowledge, constraints,
                  decisions — the context that survives turnover.
                </p>
                <p>
                  <b>The team&rsquo;s voice, preserved:</b> not a folder of
                  files. A trust document everyone writes from.
                </p>
                <p>
                  <b>Zero cold starts:</b> no prompt begins from zero again.
                </p>
              </div>
            </section>
          </div>

          <div className={styles.funnels}>
            <div className={`${styles.funnel} ${styles.f3}`}>
              <div className={styles.funnelShape} />
              <div className={styles.funnelInner}>
                <LayerThreeVignette className={styles.funnelArt} />
                <div className={styles.funnelNum}>3</div>
              </div>
            </div>

            <div className={styles.connector} />

            <div className={`${styles.funnel} ${styles.f2}`}>
              <div className={styles.funnelShape} />
              <div className={styles.funnelInner}>
                <LayerTwoVignette className={styles.funnelArt} />
                <div className={styles.funnelNum}>2</div>
              </div>
            </div>

            <div className={styles.connector} />

            <div className={`${styles.funnel} ${styles.f1}`}>
              <div className={styles.funnelShape} />
              <div className={styles.funnelInner}>
                <LayerOneVignette className={styles.funnelArt} />
                <div className={styles.funnelNum}>1</div>
              </div>
            </div>
          </div>

          <aside className={styles.rightCol}>
            <div className={styles.annotation}>
              <strong>Month 3</strong>
              <p>institutional signal that compounds instead of cancels.</p>
            </div>
            <div className={styles.annotation}>
              <strong>Month 1</strong>
              <p>
                team language emerges — shared signal replaces individual noise.
              </p>
            </div>
            <div className={styles.annotation}>
              <strong>Week 1</strong>
              <p>10 files. The repo everyone writes to.</p>
            </div>
          </aside>
        </div>

        <div className={styles.fidelity}>
          <div>
            <span className={styles.fidelitySmall}>The layer beneath all three</span>
            <span className={styles.fidelityWord}>Fidelity</span>
          </div>
          <p className={styles.fidelityBody}>
            The thing only the originator holds —{' '}
            <em>the breathing that handoffs usually kill</em>. Zero-Translation
            Building collapses the distance between thinking and doing. Shared
            infrastructure means fidelity compounds, not just speed.
          </p>
        </div>

        <footer className={styles.footer}>
          <span>Listen to &ldquo;The Unofficial Leader&rdquo; · Field Note Vol. 03</span>
          <span className={styles.urlChip}>#ZeroTranslationBuilding</span>
        </footer>
      </article>
    </div>
  )
}
