import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {projects} from '../data/projects';
import styles from './index.module.css';

export default function Home(): ReactNode {
  return (
    <Layout
      title="Documentation"
      description="Versioned documentation for projects and tools by Ryan Laird.">
      <header className={styles.hero}>
        <div className="container">
          <Heading as="h1" className={styles.title}>
            Documentation for the things I build
          </Heading>
          <p className={styles.lede}>
            Getting started guides, architecture notes, API references and deployment
            guides. Each project is versioned alongside its releases.
          </p>
          <div className={styles.actions}>
            <Link className="button button--primary button--lg" to="/docs/getting-started/installation">
              Get started
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/intro">
              Browse the docs
            </Link>
          </div>
        </div>
      </header>
      <main className="container margin-vert--lg">
        <Heading as="h2">Projects</Heading>
        <ul className={styles.projects}>
          {projects.map((p) => (
            <li key={p.name} className={styles.project}>
              <Heading as="h3" className={styles.projectName}>
                <Link to={p.docsPath}>{p.name}</Link>
              </Heading>
              <p>{p.summary}</p>
              <span className={styles.status} data-status={p.status}>{p.status}</span>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}
