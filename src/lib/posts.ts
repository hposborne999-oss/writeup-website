// Manual blog posts. Used while Soro's RSS feed isn't serving content —
// Harry supplies the article, it's added here, and it renders in the WriteUp
// design. (src/lib/feed.ts holds the RSS integration for when Soro is fixed.)

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // "22 Jul 2026"
};
export type FullPost = Post & { readTime: string; contentHtml: string };

const posts: FullPost[] = [
  {
    slug: "what-an-ai-audit-for-surveyors-should-check",
    title: "What an AI Audit for Surveyors Should Check",
    excerpt:
      "An AI audit for surveyors checks valuations, evidence and instructions across every draft report, helping registered valuers find issues before sign-off.",
    category: "Practice",
    date: "22 Jul 2026",
    readTime: "8 min read",
    contentHtml: `
<p>A valuation report can be technically well reasoned and still contain a figure that does not reconcile. The market value in the executive summary may differ from the figure in the valuation section. A comparable may be described as having 4,200 sq ft in one table and 4,020 sq ft in the narrative. A stated net initial yield may not follow from the rent, price and purchaser's costs shown.</p>
<p>These are not necessarily failures of valuation judgement. They are the predictable consequences of preparing detailed reports under time pressure, often using information drawn from several sources and responding to instruction-specific requirements. An AI audit of valuation reports can be useful when it acts as a controlled second pair of eyes — reading the draft as one document and directing the valuer to points requiring a professional decision.</p>

<h2>An AI audit for surveyors is not a valuation opinion</h2>
<p>The surveyor remains responsible for the valuation, the evidence selected and the final report. AI should not decide whether a comparable is truly comparable, substitute its view of market sentiment, or approve a report for issue. Those tasks require inspection knowledge, local market context, experience and professional judgement.</p>
<p>Its role is narrower, but materially valuable. An effective audit checks whether the report says what the valuer intends it to say, whether supporting facts are consistent throughout, and whether the document meets the relevant reporting and lender requirements. It reduces the risk that a correct valuation rationale is undermined by an avoidable contradiction, calculation error or omission.</p>
<p>That distinction matters for regulated practice. The purpose is not to automate sign-off. It is to make the final review more targeted, more repeatable and easier to evidence.</p>

<h2>Start with figures that do not reconcile</h2>
<p>Reports contain figures in many forms: headline market values, adopted rents, areas, lease terms, capital values per square foot, yields, dates and comparable analysis. A conventional proofread can identify a typographical error in a single paragraph, but it is much harder to test whether the same figure has been used consistently across a 30-page report.</p>
<p>Consider an office investment valued at £3,850,000. The valuation calculation applies a passing rent of £285,000 per annum at a 6.85% yield, while the summary refers to a 6.50% net initial yield. Either statement may be explainable if costs, rent-free periods or different income assumptions are involved. But the report must show that explanation clearly. If it does not, the discrepancy should be flagged before issue.</p>
<p>The same applies to areas. A report may use 12,500 sq ft in the valuation approach and 11,950 sq ft in a comparable schedule, producing conflicting capital values per sq ft. The source may be an outdated agent's brochure, a measurement conversion, or a simple transcription error. An audit should identify the mismatch and show the relevant locations, leaving the surveyor to establish which area is appropriate.</p>
<p>This is where whole-document reading has practical value. It does not merely spot a number. It tests the relationship between numbers that appear in different sections of the report.</p>

<h2>Calculations need context, not just arithmetic</h2>
<p>Basic arithmetic checking is useful, but valuation reports require more than a calculator. A stated yield may be mathematically correct but based on a rent that conflicts with the tenancy schedule. A price per sq m may be accurate against the stated area but inconsistent with the units used for each comparable.</p>
<p>The audit process should therefore look for calculation inputs as well as outputs. It should identify where the report states a rent, price, area or yield, then test whether the resulting analysis is internally coherent. This helps a reviewer distinguish a genuine error from an assumption that simply needs clearer disclosure.</p>

<h2>Check the evidence behind the conclusion</h2>
<p>Comparable evidence does not become persuasive simply because it is presented in a table. The report needs to explain the transaction date, property type, tenure, size, condition, location and the adjustments made when moving from evidence to the adopted figure.</p>
<p>A common quality-assurance issue arises where a comparable is described as freehold in the narrative but leasehold in the schedule, or where its transaction date is stated as March 2024 in one section and March 2025 elsewhere. These details affect relevance. A lender or client reviewing the report may reasonably question whether the evidence was properly understood, even if the adopted value remains supportable.</p>
<p>An AI audit should search for these cross-report inconsistencies. It should also identify whether the report contains the minimum number of comparables required by the instruction, whether dates fall within any specified evidence period, and whether critical attributes have been omitted. It cannot judge market comparability in the round. It can, however, ensure that the evidence presented is complete enough for the surveyor to defend that judgement.</p>
<p>Lease analysis deserves the same attention. A tenant covenant statement may refer to a guarantor in one section but omit it from the tenancy narrative. A break option may be cited but its date or conditions may differ between the lease summary and valuation rationale. Such details can alter the assessment of income security, unexpired term and investment value. They should not be left to chance in a final proofread.</p>

<h2>Test the report against the instruction</h2>
<p>Many report defects are not valuation defects at all. They arise because the report has not answered a client's specific question in the required form.</p>
<p>For secured lending work, an instruction might require a comment on an EWS1 form, a stated marketing period, a minimum quantity of comparable evidence, confirmation of a special assumption, or a particular declaration. These requirements can be easy to miss when they sit outside the usual report template or vary between lenders.</p>
<p>A useful AI audit compares the draft against a defined set of criteria. It should flag an absent marketing-period statement where one is required, identify an EWS1 reference that appears incomplete, or highlight where the report contains fewer comparable transactions than the instruction specifies. It should also test whether a stated assumption is carried consistently into the valuation conclusion and certificate.</p>
<p>This is particularly valuable for multi-office practices and lender-side QA teams. Consistent checks create a clearer baseline across reports while allowing individual valuers to apply judgement to the property and market. The goal is not to force every report into identical language. It is to ensure that mandatory information is considered, recorded and capable of review.</p>

<h2>Make exceptions easy to review</h2>
<p>An audit is only useful if its findings can be reviewed efficiently. A long, unprioritised list of possible issues creates a new administrative burden and encourages users to dismiss alerts wholesale.</p>
<p>Findings should be clear about the issue, the relevant wording or figures, and why the point matters. For example: the report refers to an adopted ERV of £42.50 per sq ft on page 14, but applies £40.00 per sq ft in the valuation calculation on page 22. The valuer can then confirm whether this is an error, a distinction between different areas, or an assumption that requires explanation.</p>
<p>The same principle applies to apparent contradictions. A report may properly state both a vacant-possession value and an investment value under different assumptions. The audit should flag the differing values for review, not treat their existence as proof that the report is wrong. Professional control depends on the ability to accept, reject or amend each finding with a reasoned view.</p>

<h2>Where AI quality assurance fits in the workflow</h2>
<p>The most effective point for an audit is after the draft is sufficiently complete to be read as a whole, but before final sign-off. Running the check then allows the valuer to correct an inconsistency while the evidence and instruction remain fresh. It also avoids asking a senior reviewer to spend time finding basic omissions that can be identified systematically.</p>
<p>For a sole practitioner, this can provide reassurance before a report is issued without a second valuer available for a full internal review. For a valuation team, it can improve first-pass quality and focus peer review on the valuation approach. For panel managers and lender-side teams, it can support a more consistent QA process across varied report formats and providers.</p>
<p>WriteUp applies this approach to RICS valuation reports, reviewing a draft in one to two minutes for report-wide inconsistencies, calculations and instruction-led checks. The point is not speed for its own sake. It is to give the surveyor time back for the decisions that require professional judgement.</p>

<h2>A better final review is a more defensible one</h2>
<p>No system can remove the need for careful inspection, relevant market evidence or a properly reasoned valuation. Nor should it. The risk in reporting often lies in the small disconnect between those sound professional foundations and the final document sent to the client.</p>
<p>A disciplined AI audit helps locate those disconnects before they become queries, delays or avoidable exposure. Used with defined checks, transparent findings and retained valuer control, it supports a final review that is less about hunting through pages and more about standing behind the conclusion.</p>
`.trim(),
  },
];

export async function getPosts(): Promise<Post[]> {
  return posts;
}

export async function getPost(slug: string): Promise<FullPost | null> {
  return posts.find((p) => p.slug === slug) ?? null;
}
