import styles from './ZeroTranslationStack.module.css'
import {
  LayerOneVignette,
  LayerTwoVignette,
  LayerThreeVignette,
  RoutingCard,
  CodeCheckCard,
} from './ZeroTranslationVignettes'
import { Funnel, UpArrow } from './ZeroTranslationFunnel'

const SIZES = {
  f1: { width: 600, height: 200 },
  f2: { width: 540, height: 188 },
  f3: { width: 480, height: 178 },
} as const

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
          {/* ── Row 3 (top): Shared Standards ── */}
          <section className={`${styles.layerDesc} ${styles.desc3}`}>
            <h3>Layer 3: Shared Standards</h3>
            <p className={styles.layerSub}>how the system earns trust over time</p>
            <hr />
            <div className={styles.bullets}>
              <p>
                <b>Explicit quality norms:</b> the team can name what good sounds
                like and correct it when it drifts.
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

          <div className={styles.funnelCell3}>
            <div className={`${styles.funnel} ${styles.f3}`}>
              <Funnel
                width={SIZES.f3.width}
                height={SIZES.f3.height}
                variant="cream"
                className={styles.funnelShape}
              />
              <div className={styles.funnelInner}>
                <LayerThreeVignette className={styles.funnelArt} />
                <div className={styles.funnelNum}>3</div>
              </div>
              <CodeCheckCard className={styles.codeCheckCard} />
            </div>
          </div>

          <aside className={`${styles.annotation} ${styles.ann3}`}>
            <strong>Month 3</strong>
            <p>institutional signal that compounds instead of cancels.</p>
          </aside>

          {/* ── arrow row: 3 ↑ 2 ── */}
          <div className={`${styles.arrowCell} ${styles.arrow32}`}>
            <UpArrow size={42} />
          </div>
          <div className={`${styles.tlCell} ${styles.tl32}`}>
            <span className={styles.tlShaft} />
          </div>

          {/* ── Row 2: Shared Language ── */}
          <section className={`${styles.layerDesc} ${styles.desc2}`}>
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

          <div className={styles.funnelCell2}>
            <div className={`${styles.funnel} ${styles.f2}`}>
              <Funnel
                width={SIZES.f2.width}
                height={SIZES.f2.height}
                variant="mid"
                className={styles.funnelShape}
              />
              <div className={styles.funnelInner}>
                <LayerTwoVignette className={styles.funnelArt} />
                <div className={styles.funnelNum}>2</div>
              </div>
            </div>
          </div>

          <aside className={`${styles.annotation} ${styles.ann2}`}>
            <strong>Month 1</strong>
            <p>team language emerges — shared signal replaces individual noise.</p>
          </aside>

          {/* ── arrow row: 2 ↑ 1 ── */}
          <div className={`${styles.arrowCell} ${styles.arrow21}`}>
            <UpArrow size={42} />
          </div>
          <div className={`${styles.tlCell} ${styles.tl21}`}>
            <span className={styles.tlShaft} />
          </div>

          {/* ── Row 1 (bottom): Shared Foundation ── */}
          <section className={`${styles.layerDesc} ${styles.desc1}`}>
            <h3>Layer 1: Shared Foundation</h3>
            <p className={styles.layerSub}>what feeds the system</p>
            <hr />
            <div className={styles.bullets}>
              <p>
                <b>Institutional memory:</b> project knowledge, constraints,
                decisions — the context that survives turnover.
              </p>
              <p>
                <b>The team&rsquo;s voice, preserved:</b> not a folder of files.
                A trust document everyone writes from.
              </p>
              <p>
                <b>Zero cold starts:</b> no prompt begins from zero again.
              </p>
            </div>
          </section>

          <div className={styles.funnelCell1}>
            <div className={`${styles.funnel} ${styles.f1}`}>
              <Funnel
                width={SIZES.f1.width}
                height={SIZES.f1.height}
                variant="deep"
                className={styles.funnelShape}
              />
              <div className={styles.funnelInner}>
                <LayerOneVignette className={styles.funnelArt} />
                <div className={styles.funnelNum}>1</div>
              </div>
              <RoutingCard className={styles.routingCard} />
            </div>
          </div>

          <aside className={`${styles.annotation} ${styles.ann1}`}>
            <strong>Week 1</strong>
            <p>10 files. The repo everyone writes to.</p>
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
