# Content sources and claim audit

Prepared 2026-11-07 for the local thesis project-page draft. This is an internal editorial and provenance document, not an additional experiment report. Existing source files and recorded results were read; no training, inference, SLAM run, or accuracy re-evaluation was performed for this page.

All source paths below are relative to the workspace root, `C:/Users/75264/Documents/master thesis`. Line numbers refer to the files inspected on this date. The short source IDs expand to the complete relative paths listed below; they are not independent sources.

## Page outline and paragraph roles

1. **Opening:** descriptive working title, semantic-map teaser, and three explicitly labelled validation metrics.
2. **Challenge and contribution:** visual information supports semantic learning; a trainable fusion teacher transfers it to a LiDAR-only student.
3. **Method and practical advantage:** separate training and deployment, preserve point correspondence, and supervise PIN-SLAM's native semantic map after geometric tracking.
4. **Evidence:** SemanticKITTI validation, IPB validation with training/inference inputs, and a class-weighting/augmentation ablation. Keep the reported test result in a separate disclosure.
5. **Integration:** KITTI09 neural support-point maps, carefully identified scratch-model qualitative examples, and optional trajectory details with evaluation windows stated.
6. **Resources:** explicit placeholders for the final thesis, code/model links, video, poster, identity, and final citation.

The abstract's first paragraph establishes the problem and training contribution. Its second paragraph explains deployment, native map integration, and supported segmentation results. No chronology of exploratory implementations is presented as the research contribution.

## Source registry

| ID | Workspace-relative source |
| --- | --- |
| C5 | `output/thesis/Chapter5_Experiments_20261026/latex/experiments_chapter.tex` |
| I | `output/pdf/Introduction_PINSLAM_20261023/latex/introduction.tex` |
| IA | `output/pdf/Introduction_PINSLAM_20261023/review/Claim_Evidence_Audit.md` |
| SK | `output/thesis/Chapter5_Experiments_20261026/latex/tables/semantickitti_main.tex` |
| BB | `output/thesis/Chapter5_Experiments_20261026/latex/tables/backbones.tex` |
| IPB | `output/thesis/Chapter5_Experiments_20261026/latex/tables/own_comparison.tex` |
| ABL | `output/thesis/Chapter5_Experiments_20261026/latex/tables/segmentation_main.tex` |
| POSE | `output/thesis/Chapter5_Experiments_20261026/latex/tables/pose_comparison.tex` |
| VA | `output/latex/SemanticKITTI_Visual_Ablation_20261027/semantickitti_visual_ablation_table.tex` |
| MC | `output/latex/SemanticKITTI_Method_Comparison_20261027/semantickitti_methods_table.tex` |
| TIMING | `output/latex/SemanticKITTI_Method_Comparison_20261027/evidence_ours_timing.json` |
| AP | `output/website/DINO_LiDAR_Thesis_20261107/sources/ASSET_PROVENANCE.json` |
| FUSION | `output/figures/Fusion_Teacher_Compact_20261026/source_alignment.json` |
| MAPFLOW | `output/figures/Semantic_Mapping_Flow_20261026/source_alignment.json` |
| FIGREAD | `outputs/kitti09_online_semantic_compare_20261023/reports/r01/figures/FIGURES.md` |
| FIGPROV | `outputs/kitti09_online_semantic_compare_20261023/reports/r01/figures/FIGURE_PROVENANCE.json` |
| SCRATCH | `outputs/own500_epoch44_prediction_visualization_20261027/model_archive/selection.json` |
| SCRATCHRUN | `outputs/own500_epoch44_prediction_visualization_20261027/run_manifest.json` |
| SCRATCHVIEW | `outputs/own500_epoch44_prediction_visualization_20261027/assets_completion.json` |
| IDENTITY | `deliverables/wu2026msc_references_20261008/wu2026msc-master/thesis.tex` |

IA is an existing audit of the explicitly identified integrated source archive, not a fresh audit of an arbitrary live checkout. Its lines 7–14 identify the archive, hash, extracted root, and verification scope. It is used together with the experiment chapter and figure-specific source-alignment records.

## Main claim–evidence map

| Webpage claim | Evidence | Status and scope |
| --- | --- | --- |
| Visual features support training; deployment uses LiDAR alone. | I lines 75–93; C5 lines 247–249; IA lines 20, 25. | **Supported.** No runtime image encoder or fusion teacher is claimed. |
| DINOv3 is frozen, while the fusion teacher and student are trainable during segmentation training. | C5 lines 162–168; IA lines 20–25. | **Supported.** A frozen DINO encoder is distinct from the trainable fusion teacher. |
| A four-stage point–voxel student provides geometric features for the fusion teacher. | C5 lines 154–168; FUSION lines 8–18. | **Supported.** The same final visual descriptor is adapted at the four stages; this is not a claim about four different DINO layers. |
| Main and auxiliary prediction heads participate in multi-head distillation. | C5 lines 201–208; IA line 23; FUSION lines 13–18. | **Supported.** One main pair and four stage-wise auxiliary pairs. |
| Class weighting addresses the long-tailed label distribution. | I lines 85–92; IA line 24; ABL lines 3, 9–15. | **Supported as training design.** Class weights apply to cross-entropy; no unsupported DINO-versus-no-DINO gain is claimed. |
| The student predicts 19 semantic classes from one LiDAR scan and encodes reflectance availability. | C5 lines 154–157; IA line 21; I lines 98–100. | **Supported.** Geometric input plus intensity/availability; no runtime RGB requirement. |
| Original point indices preserve correspondence through prediction and mapping selection. | I lines 95–101; IA line 26; MAPFLOW lines 23–31. | **Supported.** The webpage does not infer identity from nearest points after arbitrary resampling. |
| Predicted labels supervise PIN-SLAM's native semantic decoder and shared neural point features after geometric tracking. | I lines 100–104; IA lines 27–32; C5 lines 253–266; MAPFLOW lines 28–56. | **Supported.** The student and spatial map semantic MLP are separate models. |
| The learned scene supports semantic map queries. | I lines 100–103; IA lines 28–34; MAPFLOW lines 48–56. | **Supported.** No evaluated navigation or open-vocabulary reasoning is claimed. |
| Motion estimation uses geometric registration. | C5 lines 264–266; IA lines 27, 62; MAPFLOW lines 33–36. | **Supported.** No direct semantic residual, semantic pose refinement, or new semantic PGO factor is presented. |

### Model and label distinctions

- The **student** is trained offline and frozen during mapping. It produces point-wise predictions for the 19 valid classes.
- The **fusion teacher** is learned during segmentation training with frozen DINOv3 descriptors and student geometric features. It is omitted at deployment.
- PIN-SLAM's **native semantic MLP** reads shared neural-point map features and is supervised by the student's labels during map learning. It is not the student classifier.
- Student IDs `0..18` become map IDs `1..19`; map ID `0` denotes unknown/ignored. I lines 198–204 and IA line 30 specify this interface.
- Use “semantic field”, “semantic scores”, or “semantic labels” for map outputs. The webpage does not reproduce the older Introduction notation's blanket characterization of aggregated map output as a probability vector.
- PIN-SLAM's representation and native semantic extension retain their prior provenance; IA line 32 and I lines 49–59 identify their role. The webpage's contribution is the learned observation source and integration, not invention of the native semantic MLP.

## Quantitative results and split provenance

### SemanticKITTI validation

| Displayed result | Exact recorded value where available | Evidence |
| --- | --- | --- |
| Normal-input mIoU **64.13%**, accuracy **91.87%**. | 64.1346597% / 91.8742183%. | SK line 20 (`tab:exp-semkitti-main`); IA line 43. |
| Reflectance-unavailable mIoU **60.78%**, accuracy **91.30%**. | 60.7829692% / 91.2995838%. | BB line 10 (`tab:exp-backbone`); IA line 44. |
| **4,071** complete scans, sequence **08**, fixed **19** classes. | 476,757,723 valid GT points. | C5 lines 76–85; I lines 115–120; IA lines 43–49. |
| Same checkpoint and evaluation points for both input conditions. | Deployed epoch 40; normal-input checkpoint selection. | IA lines 43–49; BB line 14; C5 lines 394–406. |
| Reflectance and its availability flag set to zero for the unavailable-input row. | Both channels zeroed. | C5 lines 394–397. |
| Single-scan inference, no test-time augmentation. | FP32 evaluation. | C5 line 233; IA line 49. |

The segmentation training split is `00–07, 09, 10`; sequence `08` is validation (C5 lines 80–84). The 64.13% and 60.78% values measure **student scan segmentation**, not semantic-map mIoU.

### Separately reported SemanticKITTI test result

The supplied comparison tables report **63.5% mIoU** and **90.3% accuracy** for DINOv3 + Baseline + W on **test sequences 11–21**: VA lines 56–69 (`tab:semantickitti_visual_ablation`); MC line 33 separately records 63.5% (`tab:semantickitti_methods`).

The current validation evidence does **not** establish that test submission: TIMING lines 8–9 explicitly store a null verified test metric and describe 63.5 as user-reported. The page therefore calls this a **reported test result**, separates it from sequence 08, and leaves the original submission URL as `TO ADD`. No leaderboard verification or new test evaluation is implied.

VA's DINOv3 validation accuracy is `--`; the webpage's 91.87% comes from SK/IA, rather than filling VA's missing cell without attribution. Other supplied test-ablation rows are not reproduced: VA lines 2–3 record that two user-supplied test rows are identical and should be checked before publication.

### IPB validation comparison

All rows below are from IPB, `tab:exp-own`, lines 3, 7–17. Every displayed score uses the same **12,946,458 valid reference points** in **100 validation scans**, frames **400–499**. Student training or fine-tuning uses frames **0–399**. C5 lines 87–100 describe the dataset and missing reflectance; C5 lines 132–142 describe comparison inputs.

| Displayed row | Training | Inference | mIoU (%) | Accuracy (%) | Source lines |
| --- | --- | --- | ---: | ---: | --- |
| LSK3DNet | SemanticKITTI | LiDAR | 19.00 | 53.81 | IPB line 10. |
| DINO in the Room | SemanticKITTI | LiDAR + four RGB views | 44.56 | 88.92 | IPB lines 11, 17. |
| Ours, from scratch | IPB 0–399 | LiDAR | 40.82 | 86.00 | IPB lines 12, 17; SCRATCH lines 36–42. |
| Ours, fine-tuned | SemanticKITTI + IPB 0–399 | LiDAR | 43.78 | 88.74 | IPB lines 13, 17; IA line 45. |

The fine-tuned exact values in IA line 45 are **43.7841390% mIoU / 88.7434386% accuracy**. The scratch record reports fractions **0.408177394982361 / 0.8600123678615418**, which round to the displayed values (SCRATCH lines 41–42).

IPB validation was used for checkpoint selection, not an independent held-out test scene (IA line 47; SCRATCH lines 36–40). It uses a fixed 19-class mean, including zero IoU for empty unions (C5 lines 39–44). The alternative 15-GT-present-class score is not substituted (IA line 47). Training data and inference modalities are shown because these methods do not share the same adaptation/input conditions. The incomplete 2DPASS row in IPB line 9 remains unreported and is not invented.

### Class-weighting and augmentation ablation

All displayed rows use SemanticKITTI **validation sequence 08** and already include the DINOv3 fusion teacher and knowledge distillation: ABL line 3, `tab:exp-segmentation`.

| Configuration | mIoU (%) | Accuracy (%) | Source |
| --- | ---: | ---: | --- |
| Unweighted cross-entropy | 61.83 | 91.95 | ABL line 9. |
| Fixed class weighting, main model | 64.13 | 91.87 | ABL line 10. |
| Local weights + weak-class augmentation | 64.98 | 91.51 | ABL line 11. |

ABL line 15 and C5 lines 360–372 specify that the final row changes **both** class-frequency statistics and augmentation. Its local statistics include sequence 08, while training scans and augmentation donors exclude 08. Thus 64.98% is a separate configuration, not the main deployed checkpoint and not an isolated augmentation gain. The page uses before/after values rather than deriving an exact percentage-point gain from rounded numbers.

## Trajectory results and evaluation windows

The webpage's table reproduces **full KITTI08, all 4,071 frames, final pose-graph optimization**: POSE lines 3, 9–11, `tab:exp-pose`.

| Configuration | ATE RMSE (m) | Translation RPE RMSE (m) | Rotation RPE RMSE (degrees) |
| --- | ---: | ---: | ---: |
| Geometry only | 4.1133 | 0.0227 | 0.1190 |
| Predicted semantic map learning | 4.0360 | 0.0264 | 0.1196 |

ATE fits a rigid `SE(3)` alignment with scale fixed to one; RPE uses a **one-frame interval**. See C5 lines 47–70 and POSE line 3. ATE and RPE measure different errors and do not justify a blanket localization-improvement claim.

The adjacent **trajectory-prefix.svg** is a separate first-500-frame **odometry** visualization, frames `0–499`, aligned within each prefix. C5 lines 302–326 and POSE lines 14–26 identify the windows and IPB external reference. It does not visualize the full-run final-PGO table. Its underlying prefix values are KITTI08 ATE 0.7111 / 0.7121 m and IPB 0.4142 / 0.4059 m (geometry / predicted semantics); they are not substituted for full-run metrics.

KITTI09 maps are a separate label-source integration experiment, all **1,591 frames**, `0–1590`, with PGO and local bundle adjustment disabled: C5 lines 427–450. KITTI09 is in the student's segmentation training split (C5 line 434). It is not unseen-sequence segmentation evidence and is not the KITTI08 trajectory table.

## Figure contexts and transformations

Source file hashes, dimensions, and conversion steps are recorded in AP. JPEG conversions resize the entire image proportionally without cropping; copied research SVGs retain their original contents. The page's newly drawn pipeline is an explanatory schematic, not an experimental rendering.

| Website figure | Original workspace-relative figure | Context and evidence |
| --- | --- | --- |
| `static/images/teaser.jpg` | `output/thesis/Chapter5_Experiments_20261026/latex/figures/native_semantic_map.png` | KITTI09 frames 0–1590, geometry / GT-supervised / student-supervised native neural support-point maps. C5 lines 429–454 (`fig:exp-native-map`); AP lines 13–29. FIGPROV lines 70–74 record the same original image hash. These are support points, not reconstructed mesh vertices. |
| `static/images/map-details.jpg` | `outputs/kitti09_online_semantic_compare_20261023/reports/r01/figures/local_map_comparison.png` | Fixed 30 × 30 × 6 m reference boxes at frames 400, 800, 1200; same three supervision columns. FIGREAD line 5; FIGPROV lines 21–23, 85–89; AP lines 32–48. KITTI09 is an integration example in the training split. |
| `static/images/segmentation-own.jpg` | `outputs/own500_epoch44_prediction_visualization_20261027/figures/frames_comparison.png` | Ground truth and epoch-44 **scratch student** predictions. Frames 0, 99, 199, 299, 399 are training; 499 is validation. SCRATCH lines 3–4, 36–42; SCRATCHRUN lines 15–21, 37; SCRATCHVIEW lines 1041–1137, 1163–1165; AP lines 115–131. It does not illustrate the 43.78% fine-tuned model. |
| `static/images/fusion-teacher.svg` | `output/figures/Fusion_Teacher_Compact_20261026/figures/fusion_teacher_compact.svg` | Training architecture schematic with four parallel fusion stages, separate classifiers, one main and four auxiliary distillation pairs. FUSION lines 8–18, 32–44; AP lines 51–64. |
| `static/images/semantic-mapping.svg` | `output/figures/Semantic_Mapping_Flow_20261026/figures/semantic_mapping_flow.svg` | Current native map-learning route. Student labels enter at the Mapper boundary after geometric registration; shared map features feed the separate map decoders. MAPFLOW lines 22–57, 65–70; AP lines 67–80. |
| `static/images/trajectory-prefix.svg` | `output/thesis/Chapter5_Experiments_20261026/latex/figures/prefix_trajectories.svg` | First 500 odometry poses of KITTI08 and IPB; independently fitted rigid prefix alignment, unit scale. C5 lines 302–326 (`fig:exp-prefix`); POSE lines 14–26; AP lines 99–112. |
| `static/images/pipeline.svg` | New webpage schematic | Condenses the supported training/deployment relationships from I lines 75–104, IA lines 20–30, FUSION lines 8–18, MAPFLOW lines 22–57. Geometric tracking provides poses to map learning; student labels do not feed a semantic tracking residual. |

The prepared but currently unused student/backbone/weak-class figures remain listed in AP lines 83–96, 134–147, and 150–163. They are not additional webpage results unless a visible section actually uses them. A future social-preview derivative of the teaser inherits the same KITTI09 integration context and is not an additional result.

## Identity, resources, and excluded claims

- IDENTITY lines 29–30 contain template placeholders, not a confirmed author or official thesis title. Its template author's comment and example reviewer affiliation are not user identity evidence. The page therefore uses a labelled working title and identity placeholders.
- No final complete thesis PDF, public code/model release URL, poster, or demo video was established from the inspected material. Resource buttons are visibly pending; chapter PDFs are not labelled as the complete thesis. The BibTeX is explicitly a draft `@mastersthesis` entry.
- No new SOTA, best-in-class, comprehensive trajectory improvement, direct semantic tracking, evaluated navigation, instance reasoning, or open-vocabulary claim is introduced.
- No unsupported map mIoU is filled for KITTI08 or IPB. Existing missing entries remain missing; KITTI09 map metrics cannot be relabelled as these sequences.
- The historical 16.5 scans/s student measurement is not a displayed performance claim. It would need its specific FP32/batch-1/shared-GPU timing scope if added; it is not end-to-end SLAM throughput.
- The older `output/pdf/Approach_Baseline_Weighted_20261022/latex/approach.tex` contains a separate probabilistic-map/refinement narrative. It was not used as evidence for the webpage's current mapping route.
- Website-template attribution and licence are separate from research-asset and manuscript release rights; preserve the project's `ATTRIBUTION.md`. The page does not invent a thesis publication licence.

## Five-dimension writing self-review

| Dimension and question | Answer and resolution |
| --- | --- |
| **Contribution:** Can a reader identify the concrete contribution without mistaking prior PIN-SLAM machinery for a new method? | Yes. The page centers frozen visual guidance, a trainable fusion teacher, a deployable LiDAR student, and the prediction-to-native-map interface. The semantic MLP remains explicitly native to PIN-SLAM. |
| **Writing clarity:** Does each paragraph advance one message with stable terminology? | Yes. The abstract separates training from deployment/evidence. Student, fusion teacher, frozen encoder, geometric tracker, and map semantic MLP have distinct roles. “Reflectance” and “intensity” refer to the same recorded input attribute in the source protocols. |
| **Experimental strength:** Does each displayed number have a source and an appropriate comparison? | Yes. Tables above map every main result to recorded lines. All ablation rows include teacher/distillation; the combined local-weight/augmentation row is identified. No controlled no-DINO gain is invented. |
| **Evaluation completeness:** Are splits, model selection, inputs, missing values, and trajectory windows stated? | Yes. Sequence 08 validation and 11–21 reported test are separate; IPB training/validation frames and comparison modalities are shown; scratch qualitative samples are identified; full-PGO and odometry-prefix results are separated. Original test submission and release materials remain explicit placeholders. |
| **Method design soundness:** Does the page agree with the current integration boundary? | Yes. Prediction correspondence is preserved; geometric tracking precedes current-frame label supervision of map learning. The webpage does not reuse the older probability-voting/refinement formulation or call the student the map decoder. |

**Read-only content review outcome:** The inspected page's main claims, numerical values, and figure captions align with the evidence above. No content correction to `index.html` was required by this audit. Remaining publication placeholders are explicit; their absence is not filled with invented identity, links, or experiments.
