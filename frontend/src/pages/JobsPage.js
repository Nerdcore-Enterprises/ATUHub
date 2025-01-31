import React from 'react';
import { useState } from 'react';
import Header from '../components/header';
import GenericPage from '../components/genericPage';
import JobWidget from '../components/JobSearch/JobWidget';
import Widget from '../components/homeWidget';
import ResponsiveFullWidget from '../components/JobSearch/ResponsiveFullWidget';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import GenericModal from '../components/GenericModal/GenericModal';

export default function JobsPage() {
    const [jobIndex, setJobIndex] = useState(-1);
    const [applyVisible, setApplyVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const currentFilters = [
        'current',
        'filters',
        'here'
    ]

    const testJobData = [
        {
            name: "Slims Chickens",
            address: "404 Nowhere St, 12345",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel corporis maiores quis illum dolorem eos ea blanditiis quisquam aliquid praesentium? Tempore saepe deleniti, in hic est voluptates iste beatae eius? Minus natus pariatur consequuntur! Dolore omnis fugit, architecto sunt beatae ipsum nostrum ab, molestias nihil magni saepe, neque sed obcaecati quos sit quibusdam aspernatur rerum perspiciatis! Doloremque quaerat aliquam doloribus blanditiis dolore voluptates voluptatum fugit, odit quasi expedita, repellendus debitis repellat accusamus corrupti nemo? Deserunt sint ad sapiente eum nesciunt ducimus amet impedit reprehenderit explicabo, totam quisquam ipsum accusantium nemo dignissimos iure soluta maxime officia cumque facere labore dolore recusandae error quidem eveniet! Est tenetur, molestias velit pariatur optio adipisci odit nam, doloribus, quae et possimus voluptatibus molestiae at consequatur dicta iste? Id aliquid blanditiis fuga soluta ullam odit fugiat quia at. Neque odio non temporibus rerum nesciunt a dolorem assumenda corporis provident, quidem mollitia alias harum maiores, architecto sit? Delectus provident quae doloribus distinctio illum saepe iusto omnis, esse, incidunt ipsa recusandae, libero minima laborum maxime pariatur quasi! Nesciunt, alias enim nemo sunt hic quos, praesentium excepturi tempora deserunt, modi adipisci eum dolorum voluptatibus molestias non ipsam repudiandae quas vitae sed! Consequuntur beatae omnis repellat suscipit cumque nostrum commodi recusandae sed amet porro placeat possimus inventore, officia, quia natus culpa expedita eaque error cupiditate? Distinctio placeat autem delectus unde quidem, quibusdam, eum debitis nihil qui sequi veritatis laudantium eius doloribus! Odio reprehenderit natus quidem, eaque libero soluta ullam a excepturi provident nostrum impedit officiis! Tenetur eaque facilis accusantium nostrum quaerat voluptatum mollitia temporibus earum id! Nemo perferendis, pariatur optio cupiditate facilis magni quae provident quidem maiores expedita nam distinctio, neque illum, obcaecati inventore aliquam officiis fugiat accusamus eum minus modi blanditiis cum iusto quam! Consequuntur sit, doloribus cum ex commodi praesentium, exercitationem nemo quod ullam fugiat asperiores aliquam architecto itaque repellendus vero, unde omnis eligendi aliquid. Reiciendis sint iure necessitatibus ut fugit assumenda fuga hic? Nam quas reiciendis eum animi soluta nobis. Reprehenderit ex molestias consequatur? Magnam vitae maxime nobis provident quae, in dolorem accusamus atque consectetur, a aspernatur commodi ullam facere. Laborum distinctio natus incidunt sapiente nesciunt ex rem doloribus, eius quaerat minima quo dolores rerum consequatur voluptatum. Nihil, esse. Quod numquam illo ab aperiam vero doloremque magni beatae animi tenetur tempore repellat earum quas quisquam, delectus quaerat molestias exercitationem porro ipsam eum debitis, autem obcaecati hic nesciunt. Saepe hic nam quos ut? Nesciunt amet dolorem officia nam minima dicta esse incidunt doloribus cum sint, voluptatibus quas! Tempore quas delectus debitis sed dolorem voluptatem cumque voluptates aperiam nisi obcaecati est porro quasi, incidunt velit? Quos eum quas, deserunt harum ab cumque at amet repellat officia corrupti aut excepturi sequi sit. Explicabo ducimus optio sunt? Cumque nam impedit minus aliquid ipsum assumenda nisi consequuntur exercitationem reiciendis eius consectetur expedita autem atque corporis ratione, quasi commodi quaerat! Blanditiis nemo nobis corporis quae dolorum perspiciatis exercitationem voluptatum aliquam architecto ipsum dolore obcaecati necessitatibus, deserunt voluptas dolorem est similique a eum fugit ab nihil, perferendis repellendus? Distinctio aperiam placeat tenetur enim illum ullam consectetur ipsa. Odio, sed quas. Cupiditate ipsam deserunt totam a quibusdam, dicta id sint reiciendis praesentium autem iste vel atque ducimus, accusamus facilis corrupti at ratione quos consequuntur recusandae amet minima! Cupiditate expedita illo delectus ea repellat nobis sapiente, dolores nihil blanditiis earum veritatis commodi vero voluptatibus nisi saepe, enim autem eum odio, perferendis dignissimos quas hic debitis voluptas. Ipsam autem maiores quam dicta nulla, rerum laboriosam pariatur in excepturi quia, ducimus beatae numquam consequatur dignissimos deleniti soluta eos aliquid ab dolorem vitae sed delectus minus accusamus. Eius corrupti at minus accusamus tempore voluptate suscipit quibusdam sit perspiciatis ipsam laborum officiis, illo ipsum eveniet nostrum placeat est sunt autem nihil omnis consectetur minima culpa porro soluta. Dolorem perferendis esse corporis possimus nam aliquam culpa assumenda necessitatibus, nulla ducimus eaque alias quidem dignissimos aliquid unde nostrum facere a laboriosam magni praesentium, inventore iste tempora voluptates dolor? Facere modi deserunt, iure eos dolor consequatur saepe deleniti commodi hic asperiores mollitia architecto nesciunt quidem harum suscipit accusamus sequi vitae doloribus voluptatum excepturi corporis eum, nobis, reprehenderit sapiente! Asperiores eius eligendi laborum, perferendis accusantium eveniet, nulla minus at amet sapiente officia explicabo beatae quis, pariatur quia illum atque itaque! Provident ratione dolore similique distinctio reiciendis quis aut libero eaque molestias, repellat sint recusandae excepturi minima eligendi beatae enim officia sit necessitatibus commodi obcaecati iusto! Laboriosam totam error possimus consectetur assumenda qui illum. Eos illo minus corporis aperiam cum voluptatum, eveniet iure? Possimus dolorem rem atque numquam repellat illum eveniet ipsam maxime cupiditate, tempore dolor, est sint qui blanditiis. Autem, accusantium ab. Eligendi numquam nam delectus. Earum ex repellendus nihil, assumenda porro eius adipisci debitis sit ducimus voluptate fugit quidem sed recusandae accusamus neque ipsa sapiente alias possimus, ad repudiandae atque voluptates! Magni doloribus mollitia commodi quis odit alias harum pariatur laborum a laboriosam sit incidunt et architecto, dicta velit doloremque, cum aut porro excepturi perferendis id numquam! Odit, quaerat in eos facere dolorum consequatur vel facilis reiciendis doloribus quae neque dolores maiores aut officiis architecto quas, tenetur expedita natus. Dolorem, quam excepturi sit assumenda quaerat blanditiis beatae eveniet placeat maxime aliquam quibusdam cumque amet optio incidunt eos exercitationem? Rem eligendi qui ullam voluptatibus officia at quaerat sint dolorum sunt quasi ad placeat, eveniet quae, amet consequuntur. Laborum tempora molestias rem dolor, commodi animi totam cupiditate mollitia delectus accusantium voluptates praesentium officiis neque dolores sit ipsam. Aperiam, illo quaerat ipsum commodi explicabo architecto repudiandae reprehenderit maxime reiciendis nulla magni dolorum ullam, impedit quisquam unde ex earum sapiente rerum placeat. Architecto voluptatem veritatis qui iste, sunt maxime blanditiis minima aliquid officiis excepturi corporis itaque cupiditate soluta vel corrupti consectetur totam enim animi minus exercitationem tempora debitis eos! Cum magnam sequi numquam quia autem voluptatum laborum dolorem voluptate cumque enim porro debitis reiciendis iure, dicta minus? Sint sunt quidem quasi numquam reiciendis quisquam repudiandae dolor officia rerum! Eveniet aut, ad voluptates nam ab velit, quis id itaque debitis corrupti a, eos veniam iusto atque sequi. Saepe esse doloribus vel neque ratione provident, deleniti aliquid explicabo hic!",
            pay: 99,
            time: "Full Time",
            postedTime: new Date("2025-01-01"),
            applyExternally: false,
            requirements: ["resume", "cover letter"],
            contact: "johndoe@email.com",
            link: "https://google.com"
        },
        {
            name: "Burger Bros",
            address: "404 Nowhere St, 12345",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel corporis maiores quis illum dolorem eos ea blanditiis quisquam aliquid praesentium? Tempore saepe deleniti, in hic est voluptates iste beatae eius? Minus natus pariatur consequuntur! Dolore omnis fugit, architecto sunt beatae ipsum nostrum ab, molestias nihil magni saepe, neque sed obcaecati quos sit quibusdam aspernatur rerum perspiciatis! Doloremque quaerat aliquam doloribus blanditiis dolore voluptates voluptatum fugit, odit quasi expedita, repellendus debitis repellat accusamus corrupti nemo? Deserunt sint ad sapiente eum nesciunt ducimus amet impedit reprehenderit explicabo, totam quisquam ipsum accusantium nemo dignissimos iure soluta maxime officia cumque facere labore dolore recusandae error quidem eveniet! Est tenetur, molestias velit pariatur optio adipisci odit nam, doloribus, quae et possimus voluptatibus molestiae at consequatur dicta iste? Id aliquid blanditiis fuga soluta ullam odit fugiat quia at. Neque odio non temporibus rerum nesciunt a dolorem assumenda corporis provident, quidem mollitia alias harum maiores, architecto sit? Delectus provident quae doloribus distinctio illum saepe iusto omnis, esse, incidunt ipsa recusandae, libero minima laborum maxime pariatur quasi! Nesciunt, alias enim nemo sunt hic quos, praesentium excepturi tempora deserunt, modi adipisci eum dolorum voluptatibus molestias non ipsam repudiandae quas vitae sed! Consequuntur beatae omnis repellat suscipit cumque nostrum commodi recusandae sed amet porro placeat possimus inventore, officia, quia natus culpa expedita eaque error cupiditate? Distinctio placeat autem delectus unde quidem, quibusdam, eum debitis nihil qui sequi veritatis laudantium eius doloribus! Odio reprehenderit natus quidem, eaque libero soluta ullam a excepturi provident nostrum impedit officiis! Tenetur eaque facilis accusantium nostrum quaerat voluptatum mollitia temporibus earum id! Nemo perferendis, pariatur optio cupiditate facilis magni quae provident quidem maiores expedita nam distinctio, neque illum, obcaecati inventore aliquam officiis fugiat accusamus eum minus modi blanditiis cum iusto quam! Consequuntur sit, doloribus cum ex commodi praesentium, exercitationem nemo quod ullam fugiat asperiores aliquam architecto itaque repellendus vero, unde omnis eligendi aliquid. Reiciendis sint iure necessitatibus ut fugit assumenda fuga hic? Nam quas reiciendis eum animi soluta nobis. Reprehenderit ex molestias consequatur? Magnam vitae maxime nobis provident quae, in dolorem accusamus atque consectetur, a aspernatur commodi ullam facere. Laborum distinctio natus incidunt sapiente nesciunt ex rem doloribus, eius quaerat minima quo dolores rerum consequatur voluptatum. Nihil, esse. Quod numquam illo ab aperiam vero doloremque magni beatae animi tenetur tempore repellat earum quas quisquam, delectus quaerat molestias exercitationem porro ipsam eum debitis, autem obcaecati hic nesciunt. Saepe hic nam quos ut? Nesciunt amet dolorem officia nam minima dicta esse incidunt doloribus cum sint, voluptatibus quas! Tempore quas delectus debitis sed dolorem voluptatem cumque voluptates aperiam nisi obcaecati est porro quasi, incidunt velit? Quos eum quas, deserunt harum ab cumque at amet repellat officia corrupti aut excepturi sequi sit. Explicabo ducimus optio sunt? Cumque nam impedit minus aliquid ipsum assumenda nisi consequuntur exercitationem reiciendis eius consectetur expedita autem atque corporis ratione, quasi commodi quaerat! Blanditiis nemo nobis corporis quae dolorum perspiciatis exercitationem voluptatum aliquam architecto ipsum dolore obcaecati necessitatibus, deserunt voluptas dolorem est similique a eum fugit ab nihil, perferendis repellendus? Distinctio aperiam placeat tenetur enim illum ullam consectetur ipsa. Odio, sed quas. Cupiditate ipsam deserunt totam a quibusdam, dicta id sint reiciendis praesentium autem iste vel atque ducimus, accusamus facilis corrupti at ratione quos consequuntur recusandae amet minima! Cupiditate expedita illo delectus ea repellat nobis sapiente, dolores nihil blanditiis earum veritatis commodi vero voluptatibus nisi saepe, enim autem eum odio, perferendis dignissimos quas hic debitis voluptas. Ipsam autem maiores quam dicta nulla, rerum laboriosam pariatur in excepturi quia, ducimus beatae numquam consequatur dignissimos deleniti soluta eos aliquid ab dolorem vitae sed delectus minus accusamus. Eius corrupti at minus accusamus tempore voluptate suscipit quibusdam sit perspiciatis ipsam laborum officiis, illo ipsum eveniet nostrum placeat est sunt autem nihil omnis consectetur minima culpa porro soluta. Dolorem perferendis esse corporis possimus nam aliquam culpa assumenda necessitatibus, nulla ducimus eaque alias quidem dignissimos aliquid unde nostrum facere a laboriosam magni praesentium, inventore iste tempora voluptates dolor? Facere modi deserunt, iure eos dolor consequatur saepe deleniti commodi hic asperiores mollitia architecto nesciunt quidem harum suscipit accusamus sequi vitae doloribus voluptatum excepturi corporis eum, nobis, reprehenderit sapiente! Asperiores eius eligendi laborum, perferendis accusantium eveniet, nulla minus at amet sapiente officia explicabo beatae quis, pariatur quia illum atque itaque! Provident ratione dolore similique distinctio reiciendis quis aut libero eaque molestias, repellat sint recusandae excepturi minima eligendi beatae enim officia sit necessitatibus commodi obcaecati iusto! Laboriosam totam error possimus consectetur assumenda qui illum. Eos illo minus corporis aperiam cum voluptatum, eveniet iure? Possimus dolorem rem atque numquam repellat illum eveniet ipsam maxime cupiditate, tempore dolor, est sint qui blanditiis. Autem, accusantium ab. Eligendi numquam nam delectus. Earum ex repellendus nihil, assumenda porro eius adipisci debitis sit ducimus voluptate fugit quidem sed recusandae accusamus neque ipsa sapiente alias possimus, ad repudiandae atque voluptates! Magni doloribus mollitia commodi quis odit alias harum pariatur laborum a laboriosam sit incidunt et architecto, dicta velit doloremque, cum aut porro excepturi perferendis id numquam! Odit, quaerat in eos facere dolorum consequatur vel facilis reiciendis doloribus quae neque dolores maiores aut officiis architecto quas, tenetur expedita natus. Dolorem, quam excepturi sit assumenda quaerat blanditiis beatae eveniet placeat maxime aliquam quibusdam cumque amet optio incidunt eos exercitationem? Rem eligendi qui ullam voluptatibus officia at quaerat sint dolorum sunt quasi ad placeat, eveniet quae, amet consequuntur. Laborum tempora molestias rem dolor, commodi animi totam cupiditate mollitia delectus accusantium voluptates praesentium officiis neque dolores sit ipsam. Aperiam, illo quaerat ipsum commodi explicabo architecto repudiandae reprehenderit maxime reiciendis nulla magni dolorum ullam, impedit quisquam unde ex earum sapiente rerum placeat. Architecto voluptatem veritatis qui iste, sunt maxime blanditiis minima aliquid officiis excepturi corporis itaque cupiditate soluta vel corrupti consectetur totam enim animi minus exercitationem tempora debitis eos! Cum magnam sequi numquam quia autem voluptatum laborum dolorem voluptate cumque enim porro debitis reiciendis iure, dicta minus? Sint sunt quidem quasi numquam reiciendis quisquam repudiandae dolor officia rerum! Eveniet aut, ad voluptates nam ab velit, quis id itaque debitis corrupti a, eos veniam iusto atque sequi. Saepe esse doloribus vel neque ratione provident, deleniti aliquid explicabo hic!",
            pay: 99,
            time: "Full Time",
            postedTime: new Date("2025-01-01"),
            applyExternally: true,
            requirements: ["resume"],
            contact: "burber@email.com",
            link: "https://google.com"
        },
        {
            name: "Uhhhhhhhhhhh, shop?",
            address: "404 Nowhere St, 12345",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel corporis maiores quis illum dolorem eos ea blanditiis quisquam aliquid praesentium? Tempore saepe deleniti, in hic est voluptates iste beatae eius? Minus natus pariatur consequuntur! Dolore omnis fugit, architecto sunt beatae ipsum nostrum ab, molestias nihil magni saepe, neque sed obcaecati quos sit quibusdam aspernatur rerum perspiciatis! Doloremque quaerat aliquam doloribus blanditiis dolore voluptates voluptatum fugit, odit quasi expedita, repellendus debitis repellat accusamus corrupti nemo? Deserunt sint ad sapiente eum nesciunt ducimus amet impedit reprehenderit explicabo, totam quisquam ipsum accusantium nemo dignissimos iure soluta maxime officia cumque facere labore dolore recusandae error quidem eveniet! Est tenetur, molestias velit pariatur optio adipisci odit nam, doloribus, quae et possimus voluptatibus molestiae at consequatur dicta iste? Id aliquid blanditiis fuga soluta ullam odit fugiat quia at. Neque odio non temporibus rerum nesciunt a dolorem assumenda corporis provident, quidem mollitia alias harum maiores, architecto sit? Delectus provident quae doloribus distinctio illum saepe iusto omnis, esse, incidunt ipsa recusandae, libero minima laborum maxime pariatur quasi! Nesciunt, alias enim nemo sunt hic quos, praesentium excepturi tempora deserunt, modi adipisci eum dolorum voluptatibus molestias non ipsam repudiandae quas vitae sed! Consequuntur beatae omnis repellat suscipit cumque nostrum commodi recusandae sed amet porro placeat possimus inventore, officia, quia natus culpa expedita eaque error cupiditate? Distinctio placeat autem delectus unde quidem, quibusdam, eum debitis nihil qui sequi veritatis laudantium eius doloribus! Odio reprehenderit natus quidem, eaque libero soluta ullam a excepturi provident nostrum impedit officiis! Tenetur eaque facilis accusantium nostrum quaerat voluptatum mollitia temporibus earum id! Nemo perferendis, pariatur optio cupiditate facilis magni quae provident quidem maiores expedita nam distinctio, neque illum, obcaecati inventore aliquam officiis fugiat accusamus eum minus modi blanditiis cum iusto quam! Consequuntur sit, doloribus cum ex commodi praesentium, exercitationem nemo quod ullam fugiat asperiores aliquam architecto itaque repellendus vero, unde omnis eligendi aliquid. Reiciendis sint iure necessitatibus ut fugit assumenda fuga hic? Nam quas reiciendis eum animi soluta nobis. Reprehenderit ex molestias consequatur? Magnam vitae maxime nobis provident quae, in dolorem accusamus atque consectetur, a aspernatur commodi ullam facere. Laborum distinctio natus incidunt sapiente nesciunt ex rem doloribus, eius quaerat minima quo dolores rerum consequatur voluptatum. Nihil, esse. Quod numquam illo ab aperiam vero doloremque magni beatae animi tenetur tempore repellat earum quas quisquam, delectus quaerat molestias exercitationem porro ipsam eum debitis, autem obcaecati hic nesciunt. Saepe hic nam quos ut? Nesciunt amet dolorem officia nam minima dicta esse incidunt doloribus cum sint, voluptatibus quas! Tempore quas delectus debitis sed dolorem voluptatem cumque voluptates aperiam nisi obcaecati est porro quasi, incidunt velit? Quos eum quas, deserunt harum ab cumque at amet repellat officia corrupti aut excepturi sequi sit. Explicabo ducimus optio sunt? Cumque nam impedit minus aliquid ipsum assumenda nisi consequuntur exercitationem reiciendis eius consectetur expedita autem atque corporis ratione, quasi commodi quaerat! Blanditiis nemo nobis corporis quae dolorum perspiciatis exercitationem voluptatum aliquam architecto ipsum dolore obcaecati necessitatibus, deserunt voluptas dolorem est similique a eum fugit ab nihil, perferendis repellendus? Distinctio aperiam placeat tenetur enim illum ullam consectetur ipsa. Odio, sed quas. Cupiditate ipsam deserunt totam a quibusdam, dicta id sint reiciendis praesentium autem iste vel atque ducimus, accusamus facilis corrupti at ratione quos consequuntur recusandae amet minima! Cupiditate expedita illo delectus ea repellat nobis sapiente, dolores nihil blanditiis earum veritatis commodi vero voluptatibus nisi saepe, enim autem eum odio, perferendis dignissimos quas hic debitis voluptas. Ipsam autem maiores quam dicta nulla, rerum laboriosam pariatur in excepturi quia, ducimus beatae numquam consequatur dignissimos deleniti soluta eos aliquid ab dolorem vitae sed delectus minus accusamus. Eius corrupti at minus accusamus tempore voluptate suscipit quibusdam sit perspiciatis ipsam laborum officiis, illo ipsum eveniet nostrum placeat est sunt autem nihil omnis consectetur minima culpa porro soluta. Dolorem perferendis esse corporis possimus nam aliquam culpa assumenda necessitatibus, nulla ducimus eaque alias quidem dignissimos aliquid unde nostrum facere a laboriosam magni praesentium, inventore iste tempora voluptates dolor? Facere modi deserunt, iure eos dolor consequatur saepe deleniti commodi hic asperiores mollitia architecto nesciunt quidem harum suscipit accusamus sequi vitae doloribus voluptatum excepturi corporis eum, nobis, reprehenderit sapiente! Asperiores eius eligendi laborum, perferendis accusantium eveniet, nulla minus at amet sapiente officia explicabo beatae quis, pariatur quia illum atque itaque! Provident ratione dolore similique distinctio reiciendis quis aut libero eaque molestias, repellat sint recusandae excepturi minima eligendi beatae enim officia sit necessitatibus commodi obcaecati iusto! Laboriosam totam error possimus consectetur assumenda qui illum. Eos illo minus corporis aperiam cum voluptatum, eveniet iure? Possimus dolorem rem atque numquam repellat illum eveniet ipsam maxime cupiditate, tempore dolor, est sint qui blanditiis. Autem, accusantium ab. Eligendi numquam nam delectus. Earum ex repellendus nihil, assumenda porro eius adipisci debitis sit ducimus voluptate fugit quidem sed recusandae accusamus neque ipsa sapiente alias possimus, ad repudiandae atque voluptates! Magni doloribus mollitia commodi quis odit alias harum pariatur laborum a laboriosam sit incidunt et architecto, dicta velit doloremque, cum aut porro excepturi perferendis id numquam! Odit, quaerat in eos facere dolorum consequatur vel facilis reiciendis doloribus quae neque dolores maiores aut officiis architecto quas, tenetur expedita natus. Dolorem, quam excepturi sit assumenda quaerat blanditiis beatae eveniet placeat maxime aliquam quibusdam cumque amet optio incidunt eos exercitationem? Rem eligendi qui ullam voluptatibus officia at quaerat sint dolorum sunt quasi ad placeat, eveniet quae, amet consequuntur. Laborum tempora molestias rem dolor, commodi animi totam cupiditate mollitia delectus accusantium voluptates praesentium officiis neque dolores sit ipsam. Aperiam, illo quaerat ipsum commodi explicabo architecto repudiandae reprehenderit maxime reiciendis nulla magni dolorum ullam, impedit quisquam unde ex earum sapiente rerum placeat. Architecto voluptatem veritatis qui iste, sunt maxime blanditiis minima aliquid officiis excepturi corporis itaque cupiditate soluta vel corrupti consectetur totam enim animi minus exercitationem tempora debitis eos! Cum magnam sequi numquam quia autem voluptatum laborum dolorem voluptate cumque enim porro debitis reiciendis iure, dicta minus? Sint sunt quidem quasi numquam reiciendis quisquam repudiandae dolor officia rerum! Eveniet aut, ad voluptates nam ab velit, quis id itaque debitis corrupti a, eos veniam iusto atque sequi. Saepe esse doloribus vel neque ratione provident, deleniti aliquid explicabo hic!",
            pay: 99,
            time: "Full Time",
            postedTime: new Date("2025-01-01"),
            applyExternally: false,
            requirements: ["cover letter"],
            contact: "uhhhhh@email.com",
            link: "https://google.com"
        }
    ]

    const onJobClick = (newIndex) => {
        setJobIndex(newIndex);
    }

    return (
        <GenericPage>
            <Header title="Jobs" />
            {/* SEARCH */}
            <Widget>
                <div className='flex px-5 justify-center'>
                    <div className='content-center cursor-pointer' onClick={() => {console.log("search code here")}}>
                        <FontAwesomeIcon
                            icon={faSearch}
                            size='lg'
                        />
                    </div>
                    <input
                        className='py-2 px-4 flex-1 text-lg'
                        type='input'
                        placeholder='Search'
                        onChange={(e) => {setSearchQuery(e.target.value)}}
                    />
                    <div className='content-center cursor-pointer' onClick={() => {console.log("filter code here")}}>
                        <FontAwesomeIcon
                            icon={faFilter}
                            size='lg'
                        />
                    </div>
                </div>
            </Widget>
            {/* FILTERS */}
            <div className="flex space-x-4 rounded-b-[1rem] overflow-visible">
                {currentFilters.map((filter, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <Widget>{filter}</Widget>
                    </div>
                ))}
            </div>
            <div className='w-full flex flex-row gap-5'>
                {/* JOB LIST */}
                <div className='justify-center w-full lg:w-1/2 lg:min-w-[50%] '>
                    {
                        testJobData.map((data, index) => {
                            if (data.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                return(
                                    <JobWidget key={index} jobData={data} onClick={() => onJobClick(index)}/>
                                );
                            return (<></>);
                        })
                    }
                </div>
                {/* JOB INFORMATION */}
                {/* <div className='justify-center w-0 lg:w-1/2'> */}
                    <ResponsiveFullWidget onClose={() => setJobIndex(-1)} visible={jobIndex >= 0}>
                        <div className=" mb-4 mt-2 mx-10 h-[100%] flex flex-col">
                            {jobIndex >= 0 &&
                            <>
                                <div className='grow overflow-auto pb-10'>
                                    <p className="text-3xl font-semibold mb-3">
                                        {testJobData[jobIndex].name}
                                    </p>
                                    <p className='lg:max-h-[50rem] lg:min-h-[50rem]'>{testJobData[jobIndex].desc}</p>
                                </div>
                                <hr className='mb-4'></hr>
                                <div className='h-fit py-2'>
                                    {testJobData[jobIndex].applyExternally &&
                                        <a href={testJobData[jobIndex].link}>
                                            <button className="bg-[var(--ATUGreen)] ml-auto rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] w-full">
                                                Apply Externally
                                            </button>
                                        </a>
                                    }
                                    {!testJobData[jobIndex].applyExternally &&
                                        <button onClick={() => {setApplyVisible(true)}} className="bg-[var(--ATUGreen)] ml-auto rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] w-full">
                                            Apply Information
                                        </button>
                                    }
                                </div>
                                {/* Apply info modal */}
                                <GenericModal
                                    visible={applyVisible}
                                    onClose={() => {setApplyVisible(false)}}
                                    fitContent={true}
                                >
                                    <h1 className='text-center'>Contact to Apply</h1>
                                    <br/>
                                    <div className='px-4 py-2 flex flex-row w-full justify-evenly gap-10'>
                                        <div>
                                            <h1 className='text-center'>Contact:</h1> 
                                            <br/>                          
                                            <a href={"mailto:" + testJobData[jobIndex].contact} className='underline text-blue-500 text-2xl' >{testJobData[jobIndex].contact}</a>
                                        </div>
                                        <div>
                                            <h1 className='text-center'>Requirements:</h1>
                                            <br/>
                                            <ul>
                                                {testJobData[jobIndex].requirements.map((requirement, key) => {
                                                    return (
                                                        <li key={key}>{requirement}</li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </GenericModal>
                            </>
                            }
                        </div>
                    </ResponsiveFullWidget>
                {/* </div> */}
            </div>
        </GenericPage>
    );
}
