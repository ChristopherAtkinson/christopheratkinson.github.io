import fs from 'fs';
import matter from 'gray-matter';

import React from 'react';
import Link from 'next/link';

import { IPortfolio } from '@/components/models/portfolio.interface';

import styles from './styles.module.css';

const getPortfolioMarkdown = (): IPortfolio[] => {
  const files = fs.readdirSync("markdown/portfolio/");
  const markdown = files.filter((file) => file.endsWith(".md"));

  return markdown.map((filename) => {
    const content = fs.readFileSync(`markdown/portfolio/${filename}`, "utf8");
    const frontmatter = matter(content);

    return {
      title: frontmatter.data.Title,
      description: frontmatter.data.Description,
      link: frontmatter.data.Link,
      slug: filename.replace('.md', '')
    };
  })
}

export default function Portfolio() {
  const portfolioMarkdown = getPortfolioMarkdown();
  const portfolioPreview = portfolioMarkdown.map((portfolio) => (
    <div key={portfolio.slug} className={styles.card}>
      <Link href={`${portfolio.link}`}><h2 className={styles.heading}>{portfolio.title}</h2></Link>
      <p className={styles.paragraph}>{portfolio.description}</p>
    </div>
  ));

  return (
    <section className={styles.section}>
      {portfolioPreview}
    </section>
  )
}
